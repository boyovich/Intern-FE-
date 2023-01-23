import { Button } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { User } from "../../models/user";
import { SingleUser } from "./SingleUser";

export interface IUserListProps {}

export function UserList(props: IUserListProps) {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:5129/User/getAllUsers")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="header1">
        <h1>Users:</h1>
        <Link to="/new-user">
          <Button>Add User</Button>
        </Link>
      </div>
      <div className="user-list">
        {users.map((user) => (
          <SingleUser key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}
