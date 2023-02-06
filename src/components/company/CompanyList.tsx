import { Button, Pagination } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { Company } from "../../models/company";
import { SingleCompany } from "./SingleCompany";
import type { PaginationProps } from "antd";
export interface ICompanyListProps {}

export function CompanyList(props: ICompanyListProps) {
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [rangeOfCompanies, setRangeOfCompanies] = React.useState<number[]>([
    0, 1,
  ]);
  let paginationProps: PaginationProps;
  const onPaginationChange: PaginationProps["onChange"] = (
    page: number,
    pageSize: number
  ) => {
    setRangeOfCompanies([page * pageSize - pageSize + 1, page * pageSize]);
  };
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
  }, [companies]);
  return (
    <>
      <div className="list company-list">
        <div className="header1">
          <h1>Companies</h1>
          <Link to="/companies/new-company">
            <Button className="btn">Add Company</Button>
          </Link>
        </div>
        <div className="list__header company-list__header">
          <span className="company-list__header--field-name">Name</span>
          <span className="company-list__header--field-city">City</span>
          <span className="company-list__header--field-country">Country</span>
          <span className="company-list__header--field-num">
            Number of users
          </span>
        </div>
        {companies
          .slice(rangeOfCompanies[0], rangeOfCompanies[1] + 1)
          .map((com) => (
            <SingleCompany key={com.id} company={com} />
          ))}
        <Pagination
          total={companies.length}
          showTotal={(total, range) =>
            `Showing ${range[0]} - ${range[1]} of ${total} results`
          }
          defaultPageSize={2}
          defaultCurrent={1}
          onChange={onPaginationChange}
          pageSizeOptions={[2, 3, 5, 10, 20]}
          showSizeChanger
        />
      </div>
    </>
  );
}
