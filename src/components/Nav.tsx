import { Button, Divider, Popover } from "antd";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import LinkRoutes from "../AppRoutes";
import WeatherLogo from "../assets/weather-vane-1-svgrepo-com.svg";
import SunnyLogo from "../assets/element-forecast-summer-sun-sunny-svgrepo-com.svg";
import Celsius from "../assets/celsius-climate-element-forecast-temperature-thermometer-2-svgrepo-com.svg";
import CloudyLogo from "../assets/cloud-cloudy-element-forecast-sunny-svgrepo-com.svg";
import RainyLogo from "../assets/cloud-element-forecast-rain-rainy-svgrepo-com.svg";
import WindyLogo from "../assets/cloudy-element-forecast-weather-windy-svgrepo-com.svg";
import MoonNightCloudyLogo from "../assets/cloud-element-forecast-moon-night-svgrepo-com.svg";
import PartlySunnyLogo from "../assets/cloud-cloudy-element-forecast-sunny-svgrepo-com.svg";
import { Weather } from "../models/weatherForecast";

export interface INavProps {}
type Link = {
  label: string;
  href: string;
};
let activeStyle = {
  textDecoration: "underline",
};

function weatherIcon(description: string) {
  switch (description.toLowerCase()) {
    case "sunny":
      return SunnyLogo;
    case "cloudy":
      return CloudyLogo;
    case "wet":
      return RainyLogo;
    case "windy":
      return WindyLogo;
    case "partly cloudy":
      return MoonNightCloudyLogo;
    case "partly sunny":
      return PartlySunnyLogo;
    case "foggy":
      return MoonNightCloudyLogo;
    default:
      return Celsius;
  }
}
function writeWeather(weather: Weather[]) {
  return weather.map((w) => (
    <div key={w.id} className="weather_single">
      <span>{w.date.toLocaleString().substring(0, 10)}</span>
      <span>{w.description}</span>
      <img src={weatherIcon(w.description)} alt="WL" className="weather-logo" />
    </div>
  ));
}
export function Nav(props: INavProps) {
  const [weather, setWeather] = React.useState<Weather[]>([]);
  React.useEffect(() => {
    fetch("http://localhost:5129/Weather")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response;
      })
      .then((data) => {
        setWeather(data);
        console.log(weather);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="header">
      <nav className="navbar">
        {LinkRoutes.map(({ label, href }: Link) => {
          return (
            <NavLink
              key={href}
              to={href}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              {label}
            </NavLink>
          );
        })}
        <Popover
          placement="bottomRight"
          title="Weather Forecast"
          content={writeWeather(weather)}
          trigger="click"
        >
          <Button className="btn-weather">
            <img src={WeatherLogo} className="weather-logo" />
          </Button>
        </Popover>
      </nav>
    </div>
  );
}
