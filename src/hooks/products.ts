"use client";

import { apiRequest } from "@/apiBase";
import { OrderBy, Product, ProductResponse, ProductSortBy } from "@/lib/types";
import {
  useQuery,
  UseMutationOptions,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

export const productKeys = {
  all: ["products"],
  details: (id: string) => ["products", id],
};

const BASE_URL = "/products";

export type ProductParams = Partial<{
  sortBy: string;
  order: string;
}>;

export type UseProductParams =
  | {
      productParams: ProductParams | undefined;
      filter: string | undefined;
    }
  | undefined;

export const useProducts = (productParams: UseProductParams) => {
  const productUrl = BASE_URL + (productParams?.filter ?? "");

  return useQuery<ProductResponse>({
    queryKey: productKeys.all,
    queryFn: () =>
      apiRequest<ProductResponse>(
        productUrl,
        "get",
        productParams?.productParams
      ),
    staleTime: Infinity,
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: productKeys.details(id),
    queryFn: () => apiRequest<Product>(`${BASE_URL}/${id}`, "get"),
    staleTime: Infinity,
  });
};

export const useCreateProduct = (
  mutationOptions?: UseMutationOptions<Product, unknown, Product>
) => {
  const queryClient = useQueryClient();
  return useMutation<Product, unknown, Product>({
    mutationFn: (product) =>
      apiRequest<Product, Product>(BASE_URL, "post", product),
    ...mutationOptions,
    onSuccess: (data, product, params) => {
      queryClient.setQueryData<Product[]>(productKeys.all, (old) => {
        if (!old) return [{ ...product, id: 1 }];
        return [...old, { ...product, id: old.length + 1 }];
      });
      mutationOptions?.onSuccess?.(data, product, params);
    },
  });
};

export const useUpdateProduct = (
  mutationOptions?: UseMutationOptions<Product, unknown, Product>
) => {
  const queryClient = useQueryClient();
  return useMutation<Product, unknown, Product>({
    mutationFn: (product) =>
      apiRequest<Product, Product>(`${BASE_URL}/${product.id}`, "put", product),
    ...mutationOptions,
    onSuccess: (data, product, params) => {
      queryClient.setQueryData<Product>(
        productKeys.details(product.id.toString()),
        data
      );
      queryClient.setQueryData<Product[]>(productKeys.all, (old) => {
        if (!old) return [data];
        return old.map((u) => (u.id === product.id ? data : u));
      });
      mutationOptions?.onSuccess?.(data, product, params);
    },
  });
};

export const useDeleteProduct = (
  mutationOptions?: UseMutationOptions<Product, unknown, number>
) => {
  const queryClient = useQueryClient();
  return useMutation<Product, unknown, number>({
    mutationFn: (id) =>
      apiRequest<Product, number>(`${BASE_URL}/${id}`, "delete"),
    ...mutationOptions,
    onSuccess: (_, id, params) => {
      queryClient.setQueryData<Product[]>(productKeys.all, (old) => {
        if (!old) return [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return old.filter((u: any) => u.id !== id);
      });
      mutationOptions?.onSuccess?.(_, id, params);
    },
  });
};
