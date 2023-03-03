import { Button, Pagination, Radio, RadioChangeEvent, Select } from "antd";
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
  const [pageData, setPageData] = React.useState<number[]>([1, 2]);
  const [sortBy, setSortBy] = React.useState<string>("Name");
  const [order, setOrder] = React.useState<string>("ascend");
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
    const pageRequest = {
      pageNumber: page,
      pageSize: pageSize,
      sortBy: sortBy + order,
    };
    setPageData([page, pageSize]);
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
  const onSortChange = (value: string) => {
    console.log(value.concat(order));
    const pageRequest = {
      pageNumber: pageData[0],
      pageSize: pageData[1],
      sortBy: value.concat(order),
    };
    setSortBy(value);
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
  const onOrderChange = (e: RadioChangeEvent) => {
    console.log(sortBy.concat(e.target.value));
    const pageRequest = {
      pageNumber: pageData[0],
      pageSize: pageData[1],
      sortBy: sortBy.concat(e.target.value),
    };
    setOrder(e.target.value);
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
      <div className="order">
        <Select
          defaultValue="Name"
          style={{ width: 200 }}
          onChange={onSortChange}
        >
          <Select.Option value="Name">Name</Select.Option>
          <Select.Option value="City">City</Select.Option>
          <Select.Option value="Country">Country</Select.Option>
          <Select.Option value="NumberofUsers">Number of users</Select.Option>
        </Select>
        <Radio.Group
          options={[
            { value: "ascend", label: "Ascending" },
            { value: "descend", label: "Descending" },
          ]}
          defaultValue="ascend"
          onChange={onOrderChange}
        ></Radio.Group>
      </div>
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
