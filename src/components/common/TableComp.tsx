"use client";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import TableRowComp from "../smallComp/TableRowComp";
import TableDataListComp from "../smallComp/TableDataListComp";
import Box from "@mui/material/Box";
import SortingButtonComp from "../smallComp/SortingButtonComp";
import { SortingItem } from "@/interfaces/interfaces";

interface Props {
  tableData: any[];
  tableRowsNames: string[];
  sortingFields: SortingItem[];
  getWeatherPastWeek: (city: string) => void;
}

const TableComp = ({
  tableData,
  tableRowsNames,
  sortingFields,
  getWeatherPastWeek,
}: Props) => {
  return (
    <Box
      sx={{
        width: "641px",
        height: "432px",
        padding: "25px 16px 18px 16px",
        borderRadius: "16px",
        background: "var(--base-grey-1-bg, #1A1A1A)",
      }}
    >
      <Box sx={{ display: "flex", marginBottom: "25px" }}>
        {sortingFields.map((item: SortingItem) => (
          <SortingButtonComp
            key={item.name}
            sortingFunc={item.func}
            buttonName={item.name}
          />
        ))}
      </Box>
      <TableContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "16px",
          background: "var(--base-grey-1-bg, #1A1A1A)",
          maxWidth: "641px",
          fontFamily: "var(--font-family, Helvetica)",
        }}
        component={Paper}
      >
        <Table sx={{ maxWidth: 900, color: "white" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableRowComp tableRowsNames={tableRowsNames} />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableDataListComp
              tableData={tableData}
              getWeatherPastWeek={getWeatherPastWeek}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComp;
