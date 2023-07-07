"use client";

import { WeekTemperatures } from "@/interfaces/interfaces";
import { Box } from "@mui/material";

interface Props {
  column: WeekTemperatures;
  maxValue: number;
}

const ChartColumnMapping = ({ column, maxValue }: Props) => {
  const { temperature, dayOfWeek } = column;
  
  const fiveDegree = 30;
  const heightOfBar: number = (temperature / 5) * fiveDegree;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginRight: "26px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: `${heightOfBar}px`,
            width: "27px",
            borderRadius: "8px 8px 0px 0px",
            background: "linear-gradient(180deg, #B3FC4F 0%, #173102 100%)",
            transition: "border 1s ease-in-out;",
            "&:hover": {
              border: "3px solid var(--base-grey-2, #313131)",
            },
          }}
          title={`${temperature}°`}
        ></Box>
        <Box sx={{ marginTop: "10px" }}>{dayOfWeek}</Box>
      </Box>
    </>
  );
};

export default ChartColumnMapping;
