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
    <div>
      {!deleted && (
        <div className="company">
          <div>
            {props.company.name}
            <span> </span>
            {props.company.city}
            <span> </span>
            {props.company.country}
            <span> </span>
            {props.company.numberOfUsers}
          </div>
          <Link to={`/companies/update-company/${props.company.id}`}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={deleteCompany}>Delete</Button>
        </div>
      )}
    </div>
  );
}
