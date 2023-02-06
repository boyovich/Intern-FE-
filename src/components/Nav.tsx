import { Button } from "antd";
import { Link } from "react-router-dom";
import LinkRoutes from "../AppRoutes";
import WeatherLogo from "../assets/weather-vane-1-svgrepo-com.svg";

export interface INavProps {}
type Link = {
  label: string;
  href: string;
};
export function Nav(props: INavProps) {
  return (
    <div className="header">
      <nav className="navbar">
        {LinkRoutes.map(({ label, href }: Link) => {
          return (
            <Link key={href} to={href} className="link">
              {label}
            </Link>
          );
        })}
        <Button className="btn-weather">
          <img src={WeatherLogo} className="weather-logo" />
        </Button>
      </nav>
    </div>
  );
}
