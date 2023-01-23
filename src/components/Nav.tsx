import * as React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import AppRoutes from "../AppRoutes";
import LinkRoutes from "../AppRoutes";
import { UserList } from "./user/UserList";
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
