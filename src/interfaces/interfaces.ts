export interface WeatherItem {
  city: string;
  temperatureMax: number;
  temperatureMin: number;
  windDirection: number;
}

export interface SortingItem {
  name: string;
  func: () => void;
}

export interface CitiesItem {
  name: string;
  latitude: number;
  longitude: number;
}

export interface PastWeatherItem {
  city: string;
  temperaturePastSevenDays: number[];
  time: string[];
}

export interface WeekTemperatures {
  temperature: number;
  dayOfWeek: string;
}
