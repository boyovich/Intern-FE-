import { Button } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { Company } from "../../models/company";

export interface ISingleCompanyProps {
  company: Company;
}

export function SingleCompany(props: ISingleCompanyProps) {
  const [deleted, setDeleted] = React.useState<boolean>(false);
  const deleteCompany = () => {
    fetch("http://localhost:5129/Company/" + props.company.id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setDeleted(true);
        }
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {!deleted && (
        <div className="company-list__company">
          <span className="company-list__company-field--name">
            {props.company.name}
          </span>
          <span className="company-list__company-field--city">
            {props.company.city}
          </span>
          <span className="company-list__company-field--country">
            {props.company.country}
          </span>
          <span className="company-list__company-field--num">
            {props.company.numberOfUsers}
          </span>

          <Link
            to={`/companies/update-company/${props.company.id}`}
            className="company-list__company--edit"
          >
            <Button className="btn company-list__company--edit">Edit</Button>
          </Link>
          <Button
            onClick={deleteCompany}
            className="btn company-list__company--delete"
          >
            Delete
          </Button>
        </div>
      )}
    </>
  );
}
