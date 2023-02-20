import { Button, Pagination } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { Company } from "../../models/company";
import { Response } from "../../models/response";
import { SingleCompany } from "./SingleCompany";
import type { PaginationProps } from "antd";
export interface ICompanyListProps {}

export function CompanyList(props: ICompanyListProps) {
  const [companiesOnPage, setCompaniesOnPage] = React.useState<
    Response<Company>
  >({ responseList: [], count: 0 });
  React.useEffect(() => {
    const pageRequest = { pageNumber: 1, pageSize: 2 };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pageRequest),
    };
    fetch("http://localhost:5129/Company", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setCompaniesOnPage(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onPaginationChange: PaginationProps["onChange"] = (
    page: number,
    pageSize: number
  ) => {
    const pageRequest = { pageNumber: page, pageSize: pageSize };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pageRequest),
    };
    fetch("http://localhost:5129/Company", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setCompaniesOnPage(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        {companiesOnPage?.responseList.map((com) => (
          <SingleCompany key={com.id} company={com} />
        ))}
        <Pagination
          total={companiesOnPage.count}
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
