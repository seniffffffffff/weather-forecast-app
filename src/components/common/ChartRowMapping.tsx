"use client";
import { Box } from "@mui/material";
import React from "react";

interface Props {
  rowName: number;
}

const ChartRowMapping = ({ rowName }: Props) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ marginRight: "10px" }}>{rowName}</Box>
      <Box
        sx={{
          width: "373px",
          height: "2px",
          borderRadius: "2px",
          border: "1px dashed var(--base-grey-2, #313131)",
        }}
      ></Box>
    </Box>
  );
};

export default ChartRowMapping;
