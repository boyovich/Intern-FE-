import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { CompanyList } from "./company/CompanyList";
import { UserList } from "./user/UserList";

export interface ILayoutProps {
  children?: React.ReactNode;
}

export function Layout(props: ILayoutProps) {
  return (
    <div className="layout">
      <h1>Router:</h1>
      <div className="layout">
        <Routes>
          <Route path="users" element={<UserList />} />

          <Route path="companies" element={<CompanyList />} />
        </Routes>
      </div>
    </div>
  );
}
