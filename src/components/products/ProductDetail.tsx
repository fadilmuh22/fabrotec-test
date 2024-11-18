"use client";

import { useProduct } from "@/hooks/products";
import {
  CircularProgress,
  Grid2,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { FunctionComponent } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const ProductField: FunctionComponent<{ label: string; value?: string }> = ({
  label,
  value,
}) => {
  return (
    <Grid2 container flexDirection="column">
      <Typography variant="caption" component="p" autoCapitalize="true">
        {label}
      </Typography>
      <Typography variant="body1" component="p" autoCapitalize="true">
        {value}
      </Typography>
    </Grid2>
  );
};

export default function UserDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: product } = useProduct(id);

  if (!product) {
    return (
      <Paper className="p-5 min-w-[768px] flex justify-center items-center">
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <Paper className="p-5 min-w-[768px]">
      <Grid2 container flexDirection="column" spacing={1}>
        <Grid2 container justifyContent="space-between">
          <Grid2
            container
            flexDirection="row"
            justifyContent="start"
            alignContent="center"
            width="fit-content"
            spacing={1}
          >
            <Grid2>
              <IconButton
                onClick={() => {
                  router.back();
                }}
              >
                <ArrowBack />
              </IconButton>
            </Grid2>
            <Grid2 alignContent="center">
              <Typography variant="h5" component="h2">
                Product details
              </Typography>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 container flexDirection="row" marginLeft={6}>
          <Grid2 container size={{ xs: 12, md: 6 }} spacing={1}>
            <ProductField label="Product Name" value={product?.title} />
            <ProductField label="Description" value={product?.description} />
            <ProductField label="Price" value={product?.price.toString()} />
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 container size={{ xs: 12, md: 12 }} spacing={1}>
        {product?.images.map((image, index) => (
          <Grid2 key={index}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`${product.title} image ${index}`}
              width={250}
              height={250}
            />
          </Grid2>
        ))}
      </Grid2>
    </Paper>
  );
}
