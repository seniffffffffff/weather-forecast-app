"use client";

import { PastWeatherItem, WeekTemperatures } from "@/interfaces/interfaces";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import ChartColumnMapping from "./ChartColumnMapping";
import ChartRowMapping from "./ChartRowMapping";

interface Props {
  chartData: PastWeatherItem;
  chartName: string;
}

const ChartComp = ({ chartData, chartName }: Props) => {
  const { city = "Kyiv", temperaturePastSevenDays, time } = chartData;

  const [weekTemp, setWeekTemp] = useState<WeekTemperatures[]>([]);

  const findMaxTemp = (): number => {
    let maxTemp = 0;

    weekTemp.forEach((item) => {
      if (item.temperature > maxTemp) {
        maxTemp = item.temperature;
      }
    });

    return maxTemp;
  };

  const maxTemp = findMaxTemp();

  const dayOfWeekConverter = (day: string) => {
    const dateString = day;
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

    return dayOfWeek.slice(0, 3);
  };

  const weekTempFunc = () => {
    const updatedWeekTemperatures: WeekTemperatures[] = [];

    for (let i = 0; i < 7; i++) {
      const start = i * 48;
      const end = (i + 1) * 48;
      const temperatureSlice = temperaturePastSevenDays.slice(start, end);
      const timeSlice = time.slice(start, end);

      const avgTempInDay =
        temperatureSlice.reduce((acc, item) => acc + item, 0) /
        temperatureSlice.length;

      updatedWeekTemperatures.push({
        temperature: Math.floor(avgTempInDay),
        dayOfWeek: dayOfWeekConverter(timeSlice?.[0]),
      });
    }
    setWeekTemp(updatedWeekTemperatures);
  };

  const temperaturesArr = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].reverse();
 
  useEffect(() => {
    weekTempFunc();
  }, [city]);

  useEffect(() => {
    setWeekTemp([
      { temperature: 17, dayOfWeek: "Fri" },
      { temperature: 16, dayOfWeek: "Sun" },
      { temperature: 16, dayOfWeek: "Tue" },
      { temperature: 18, dayOfWeek: "Thu" },
      { temperature: 25, dayOfWeek: "Sat" },
      { temperature: 23, dayOfWeek: "Mon" },
      { temperature: 19, dayOfWeek: "Wed" },
    ]);
  }, []);
  return (
    <Box
      sx={{
        width: "453px",
        height: "432px",
        borderRadius: "16px",
        background: "var(--base-grey-1-bg, #1A1A1A)",
        marginRight: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px 60px 12px 24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <Box>{chartName}</Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              backgroundColor: "var(--green-neon, #B3FC4F)",
              marginRight: "8px",
            }}
          />
          <Box sx={{ fontSize: "12px", fontWeight: "500" }}>
            {city ? city : "Kyiv"}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          color: "white",
          alignItems: "flex-end",
          marginLeft: "32px",
        }}
      >
        {weekTemp.map((item, index) => (
          <Box key={index} sx={{ zIndex: "2" }}>
            <ChartColumnMapping column={item} maxValue={maxTemp} />
          </Box>
        ))}
        <Box
          sx={{
            position: "absolute",
            bottom: "8px",
            left: "-32px",
          }}
        >
          {temperaturesArr.map((item, index) => (
            <Box
              key={index}
              sx={{
                color: "var(--base-grey-4, #A3A3A3)",
                fontSize: "12px",
                lineHeight: "16px",
                marginBottom: "14px",
              }}
            >
              <ChartRowMapping rowName={item} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ChartComp;
