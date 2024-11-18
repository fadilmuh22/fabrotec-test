"use client";

import { apiRequest } from "@/apiBase";
import { Category, Product, ProductResponse } from "@/lib/types";
import {
  useQuery,
  UseMutationOptions,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { useState } from "react";

export const productKeys = {
  all: ["products"],
  search: (category?: string, params?: ProductSortParams) => [
    "products",
    category,
    params,
  ],
  category: ["products", "category"],
  details: (id: string) => ["products", id],
};

const BASE_URL = "/products";

export type ProductSortParams = Partial<{
  sortBy: string;
  order: string;
}>;

export const useProducts = () => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [productParams, setProductParams] = useState<ProductSortParams>();

  const [productUrl, setProductUrl] = useState(BASE_URL);
  const [productCategory, setProductCategory] = useState<string>("");

  const query = useQuery<ProductResponse>({
    queryKey: productKeys.search(productCategory, productParams),
    queryFn: () => {
      setIsFirstLoad(false);
      return apiRequest<ProductResponse>(productUrl, "get", productParams);
    },
    staleTime: Infinity,
  });

  return {
    isFirstLoad,
    setProductCategory: (category: string) => {
      setProductCategory(category);
      setProductUrl(`${BASE_URL}/category/${category}`);
    },
    setProductParams,
    ...query,
  };
};

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: productKeys.details(id),
    queryFn: () => apiRequest<Product>(`${BASE_URL}/${id}`, "get"),
    staleTime: Infinity,
  });
};

export const useProductCategories = () => {
  return useQuery<Category[]>({
    queryKey: productKeys.category,
    queryFn: () => apiRequest<Category[]>(`${BASE_URL}/categories`, "get"),
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
