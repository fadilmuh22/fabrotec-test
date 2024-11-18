"use client";

import { Button, Grid2, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Grid2
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Typography variant="h4" component="h2">
        Next.js 13 + Material + Tailwind
      </Typography>
      <Stack direction="row" columnGap={1}>
        <Link href="/products">
          <Button variant="contained">Products</Button>
        </Link>
        <Link href="https://github.com/fadilmuh22" target="_blank">
          <Button variant="outlined">Github</Button>
        </Link>
      </Stack>
    </Grid2>
  );
}
