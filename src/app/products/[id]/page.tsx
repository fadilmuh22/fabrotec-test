import ProductDetail from "@/components/products/ProductDetail";
import { Grid2 } from "@mui/material";

export default function Users() {
  return (
    <Grid2
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <ProductDetail />
    </Grid2>
  );
}
