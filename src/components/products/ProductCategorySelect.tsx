import React from "react";
import { useProductCategories } from "@/hooks/products";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const ProductCategorySelect: React.FC<Props> = ({ value, onChange }) => {
  const { data: categories, isLoading, error } = useProductCategories();

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error loading categories</p>;

  return (
    <FormControl fullWidth>
      <InputLabel id="product-category-label">Category</InputLabel>
      <Select
        labelId="product-category-label"
        label="Category"
        value={value}
        onChange={(event) => onChange(event.target.value as string)}
      >
        <MenuItem value="">All</MenuItem>
        {categories?.map((category) => (
          <MenuItem key={category.slug} value={category.slug}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductCategorySelect;
