"use client";

import TableCell from "@mui/material/TableCell";

interface Props {
  tableRowsNames: string[];
}

const TableRowComp = ({ tableRowsNames }: Props) => {
  return (
    <>
      {tableRowsNames.map((item: string) => (
        <TableCell
          sx={{
            height: "36px",
            padding: "0",
            color: "white",
            width: `100%/${tableRowsNames.length}`,
            background: "var(--base-black-bg, #030303)",
            borderRight: "1px solid var(--base-grey-1-bg, #1A1A1A)",
            borderBottom: "none",
            fontWeight: "bold",
            textAlign: "right",
            paddingRight: "15px",
            "&:first-child": {
              textAlign: "left",
              paddingLeft: "20px",
            },
          }}
          key={item}
        >
          {item}
        </TableCell>
      ))}
    </>
  );
};

export default TableRowComp;
