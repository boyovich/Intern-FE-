import * as React from "react";
import { Company } from "../models/company";
import { SingleCompany } from "./SingleCompany";

export interface ICompanyListProps {}

export function CompanyList(props: ICompanyListProps) {
  const [companies, setCompanies] = React.useState<Company[]>([]);
  React.useEffect(() => {
    fetch("http://localhost:5129/Company")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setCompanies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h1 className="header1">Companies:</h1>
      <div className="company-list">
        {companies.map((com) => (
          <SingleCompany key={com.id} company={com} />
        ))}
      </div>
    </>
  );
}
