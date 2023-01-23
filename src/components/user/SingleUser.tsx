import { Button } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { User } from "../../models/user";

export interface ISingleUserProps {
  user: User;
}

export function SingleUser(props: ISingleUserProps) {
  const [deleted, setDeleted] = React.useState<boolean>(false);
  const deleteUser = () => {
    fetch("http://localhost:5129/User/" + props.user.id, {
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
        <div className="user" style={{ justifyContent: "space-between" }}>
          {props.user.fullName}
          <span> </span>
          {props.user.dateOfBirth.toString().substring(0, 10)}
          <span> </span>
          {props.user.companyName}
          <span> </span>
          {props.user.position}
          <Link to={`/users/update-user/${props.user.id}`}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={deleteUser}>Delete</Button>
        </div>
      )}
    </div>
  );
}
