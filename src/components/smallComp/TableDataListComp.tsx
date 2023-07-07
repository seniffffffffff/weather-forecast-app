import { WeatherItem } from "@/interfaces/interfaces";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";

interface Props {
  tableData: WeatherItem[];
  getWeatherPastWeek: (city: string) => void;
}

const TableDataListComp = ({ tableData, getWeatherPastWeek }: Props) => {
  return (
    <>
      {tableData &&
        tableData.map((item, index) => (
          <TableRow
            key={index}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              color: "white",
              transition: "background 0.5s ease-in-out",
              "&:nth-of-type(odd)": {
                backgroundColor: "var(--base-grey-2, #313131);",
              },
              border: "none",
              "&:hover": {
                backgroundColor: "#90caf9",
              },
            }}
          >
            <TableCell
              sx={{
                color: "white",
                borderBottom: "none",
                fontWeight: "500",
                height: "36px",
                padding: "0 0 0 16px",
                cursor: "pointer",
              }}
              onClick={() => getWeatherPastWeek(item.city)}
            >
              {item.city}
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                borderBottom: "none",
                textAlign: "right",
                fontWeight: "500",
                height: "36px",
                padding: "0 16px 0 0",
              }}
            >
              {item.temperatureMax}
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                borderBottom: "none",
                textAlign: "right",
                fontWeight: "500",
                height: "36px",
                padding: "0 16px 0 0",
              }}
            >
              {item.temperatureMin}
            </TableCell>
            <TableCell
              sx={{
                color: "white",
                borderBottom: "none",
                textAlign: "right",
                fontWeight: "500  ",
                height: "36px",
                padding: "0 16px 0 0",
              }}
            >
              {item.windDirection}
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};

export default TableDataListComp;
