"use client";

import { Box, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";

interface Props {
  sortingFunc: any;
  buttonName: string;
}

const SortingButtonComp = ({ sortingFunc, buttonName }: Props) => {
  return (
    <Box sx={{ marginRight: "8px" }}>
      <Button
        sx={{
          width: "160px",
          height: "40px",
          display: "flex",
          justifyContent: "space-between",
          color: "var(--base-grey-4, #A4A4A4)",
          padding: "11px 16px",
          borderRadius: "12px",
          border: "1px solid var(--base-grey-3, #515151)",
          background: "var(--base-grey-2, #313131)",
        }}
        onClick={() => sortingFunc()}
      >
        <Box
          sx={{
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "18px",
            textTransform: "capitalize",
          }}
        >
          {buttonName}
        </Box>
        <KeyboardArrowDownIcon />
      </Button>
    </Box>
  );
};

export default SortingButtonComp;
