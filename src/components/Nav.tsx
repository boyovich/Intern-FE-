import { Link } from "react-router-dom";
import LinkRoutes from "../AppRoutes";
export interface INavProps {}
type Link = {
  label: string;
  href: string;
};
export function Nav(props: INavProps) {
  return (
    <nav className="navbar">
      <div className="link-container">
        {LinkRoutes.map(({ label, href }: Link) => {
          return (
            <div key={href} className="link">
              <Link to={href}>{label}</Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
