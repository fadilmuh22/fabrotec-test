"use client";

import { MoreHoriz } from "@mui/icons-material";

import {
  GridColDef,
  DataGrid,
  GridToolbar,
  GridSortModel,
} from "@mui/x-data-grid";
import { ProductSortParams, useProducts } from "@/hooks/products";
import { Box, Grid2, IconButton, Menu, MenuItem } from "@mui/material";
import { Product } from "@/lib/types";
import { MouseEvent, useState } from "react";
import SkeletonTable from "@/components/common/SkeletonTable";
import { useRouter } from "next/navigation";
import ProductCategorySelect from "./ProductCategorySelect";

export default function ProductTable() {
  const router = useRouter();

  const {
    data: products,
    isLoading,
    isFirstLoad,
    setProductCategory,
    setProductParams,
  } = useProducts();

  const [category, setCategory] = useState<string>("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = (userID: string) => {
    router.push(`/products/${userID}`);
    handleClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handelSort = (model: GridSortModel) => {
    if (!model.length) {
      setProductParams(undefined);
      return;
    }
    setProductParams({
      sortBy: model[0].field.toString(),
      order: model[0].sort,
    } as ProductSortParams);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setProductCategory(value);
  };

  const columns: GridColDef<Product>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Product Name",
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => <div className="capitalize">{row.title}</div>,
    },
    {
      field: "description",
      headerName: "Description",
      width: 160,
      sortable: false,
      filterable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
      sortable: true,
      filterable: true,
    },
    {
      field: "picture",
      headerName: "Picture",
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={row.thumbnail} alt={`${row.title} thumbnail`} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        return (
          <Grid2 container justifyContent="end">
            <Box>
              <IconButton onClick={handleClick} aria-haspopup="true">
                <MoreHoriz />
              </IconButton>
              <Menu
                id="product-table-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleView(row.id.toString())}>
                  View
                </MenuItem>
              </Menu>
            </Box>
          </Grid2>
        );
      },
    },
  ];

  return (
    <Box className="max-h-[80vh]">
      <Box>
        <Grid2 container justifyContent="space-between" my={2}>
          <Box className="mb-4">
            <h1 className="text-2xl font-bold">Products</h1>
          </Box>

          <Grid2 size={4}>
            <ProductCategorySelect
              value={category}
              onChange={handleCategoryChange}
            />
          </Grid2>
        </Grid2>

        {isFirstLoad ? <SkeletonTable columns={columns} rows={5} /> : <></>}

        <DataGrid
          loading={isLoading}
          slots={{ toolbar: GridToolbar }}
          columns={columns}
          rows={products?.products ?? []}
          sortingMode="server"
          onSortModelChange={(model) => handelSort(model)}
        />
      </Box>
    </Box>
  );
}
