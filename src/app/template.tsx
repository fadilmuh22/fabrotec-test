import Navbar from "@/components/common/Navbar";
import { Box } from "@mui/material";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Navbar />
      <Box className="min-w-screen min-h-screen">{children}</Box>
    </Box>
  );
}
