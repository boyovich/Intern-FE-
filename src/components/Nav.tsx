import { Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import LinkRoutes from "../AppRoutes";
import WeatherLogo from "../assets/weather-vane-1-svgrepo-com.svg";

export interface INavProps {}
type Link = {
  label: string;
  href: string;
};
let activeStyle = {
  textDecoration: "underline",
};
export function Nav(props: INavProps) {
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
        <Button className="btn-weather">
          <img src={WeatherLogo} className="weather-logo" />
        </Button>
      </nav>
    </div>
  );
}
