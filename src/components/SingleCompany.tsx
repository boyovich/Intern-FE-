import { Button } from "antd";
import * as React from "react";
import { Company } from "../models/company";

export interface ISingleCompanyProps {
  company: Company;
}

export function SingleCompany(props: ISingleCompanyProps) {
  return (
    <div className="company">
      <div>
        {props.company.name}
        <span> </span>
        {props.company.city}
        <span> </span>
        {props.company.country}
      </div>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </div>
  );
}
