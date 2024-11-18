"use client";

import { Grid2, Toolbar, AppBar, Button } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <Grid2 container justifyContent="end">
          <Grid2>
            <Button color="inherit" href="/">
              Home
            </Button>
          </Grid2>
          <Grid2>
            <ThemeToggle />
          </Grid2>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
}
