import * as React from "react";
import { User } from "../models/user";
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
      <h1 className="header1">Users:</h1>
      <div className="user-list">
        {users.map((user) => (
          <SingleUser key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}
