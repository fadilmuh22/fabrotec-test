"use client";

import { MoreHoriz } from "@mui/icons-material";

import {
  GridColDef,
  DataGrid,
  GridToolbar,
  GridSortModel,
} from "@mui/x-data-grid";
import { useProducts } from "@/hooks/products";
import { Box, Grid2, IconButton, Menu, MenuItem } from "@mui/material";
import { Product } from "@/lib/types";
import { MouseEvent, useState } from "react";
import SkeletonTable from "@/components/common/SkeletonTable";
import { useRouter } from "next/navigation";

export default function ProductTable() {
  const router = useRouter();
  // const [sortModel, setSortModel] = useState<GridSortModel>();

  // const { data: products, isLoading } = useProducts({
  //   filter: "",
  //   productParams: sortModel
  //     ? ({
  //         sortBy: sortModel[0].field,
  //         order: sortModel[0].sort?.toString(),
  //       } as ProductParams)
  //     : undefined,
  // });

  const { data: products, isLoading } = useProducts(undefined);

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
    // setSortModel(model);
    console.log(model);
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
      {isLoading ? (
        <SkeletonTable columns={columns} rows={5} />
      ) : (
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          columns={columns}
          rows={products?.products ?? []}
          // sortingMode="server"
          onSortModelChange={(model) => handelSort(model)}
        />
      )}
    </Box>
  );
}
