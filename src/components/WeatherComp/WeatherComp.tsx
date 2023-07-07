"use client";

import Box from "@mui/material/Box";
import React, { useCallback, useEffect, useState } from "react";
import ChartComp from "../common/ChartComp";
import TableComp from "../common/TableComp";
import axios from "axios";
import {
  SortingItem,
  WeatherItem,
  CitiesItem,
  PastWeatherItem,
} from "@/interfaces/interfaces";
import { cities } from "../../data/citiesData";

const WeatherComp = () => {
  const [weatherData, setWeatherData] = useState<WeatherItem[]>([]);
  const [defaultWeatherData, setDefaultWeatherData] = useState<WeatherItem[]>(
    []
  );

  const [pastWeatherData, setPastWeatherData] = useState<PastWeatherItem>({
    city: "",
    temperaturePastSevenDays: [],
    time: [],
  });

  const tableRowsNames: string[] = [
    "City",
    "Temparature max",
    "Temparature min",
    "Wind direction",
  ];

  const getWeatherDataForCity = async (city: CitiesItem) => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&hourly=temperature_2m,winddirection_10m`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      const weather = {
        city: city.name,
        temperatureMax: Math.max(...data.hourly?.temperature_2m),
        temperatureMin: Math.min(...data.hourly?.temperature_2m),
        windDirection: data.hourly?.winddirection_10m[1],
      };

      return weather;
    } catch (error) {
      console.error(`Error fetching weather data for ${city.name}:`, error);
      return null;
    }
  };

  const getWeatherForCities = async () => {
    try {
      const tempWeatherData = [];

      for (const city of cities) {
        const weather = await getWeatherDataForCity(city);

        if (weather) {
          tempWeatherData.push(weather);
        }
      }

      setWeatherData(tempWeatherData);
      setDefaultWeatherData(tempWeatherData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getWeatherPastWeek = useCallback(
    async (city: string) => {
      const searchCity: any = cities.find(
        (cityItem: CitiesItem) => cityItem.name === city
      );

      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${searchCity.latitude}&longitude=${searchCity.longitude}&hourly=temperature_2m&past_days=7`;

      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const weather: PastWeatherItem = {
          city: searchCity.name,
          temperaturePastSevenDays: [...data.hourly?.temperature_2m],
          time: [...data.hourly?.time],
        };

        setPastWeatherData(weather);
      } catch (error) {
        console.error(
          `Error fetching weather data for ${searchCity.name}:`,
          error
        );
        return null;
      }
    },
    [cities]
  );

  const isEqualsWeatherData = (arr: WeatherItem[]) => {
    return weatherData.every((element, index) => element === arr[index]);
  };

  const sortByName = () => {
    const sorted = [...weatherData].sort((a, b) => {
      if (a.city > b.city) {
        return 1;
      }
      if (a.city < b.city) {
        return -1;
      }
      return 0;
    });

    return isEqualsWeatherData(sorted)
      ? setWeatherData(defaultWeatherData)
      : setWeatherData(sorted);
  };

  const sortByMin = () => {
    const sorted = [...weatherData].sort((a, b) => {
      return a.temperatureMin - b.temperatureMin;
    });

    return isEqualsWeatherData(sorted)
      ? setWeatherData(defaultWeatherData)
      : setWeatherData(sorted);
  };

  const sortByMax = () => {
    const sorted = [...weatherData].sort((a, b) => {
      return b.temperatureMax - a.temperatureMax;
    });

    return isEqualsWeatherData(sorted)
      ? setWeatherData(defaultWeatherData)
      : setWeatherData(sorted);
  };

  const sortingFields: SortingItem[] = [
    {
      name: "Country",
      func: sortByName,
    },
    {
      name: "Min",
      func: sortByMin,
    },
    {
      name: "Max",
      func: sortByMax,
    },
  ];

  useEffect(() => {
    getWeatherForCities();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "1100px",
        margin: "0 auto",
        paddingTop: "50px",
        display: "flex",
      }}
      className="content"
    >
      <ChartComp chartData={pastWeatherData} chartName={"Analytics"} />
      <TableComp
        tableData={weatherData}
        tableRowsNames={tableRowsNames}
        sortingFields={sortingFields}
        getWeatherPastWeek={getWeatherPastWeek}
      />
    </Box>
  );
};

export default WeatherComp;
