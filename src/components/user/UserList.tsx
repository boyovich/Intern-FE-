import { Button, Pagination } from "antd";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { User } from "../../models/user";
import { toogleOpen } from "../../redux/slices/openUserformSlice";
import { selectUser } from "../../redux/slices/selectUserSlice";
import { RootState } from "../../redux/store/store";
import { SingleUser } from "./SingleUser";
import { UserForm } from "./UserForm";

export interface IUserListProps {}

export function UserList(props: IUserListProps) {
  const [users, setUsers] = React.useState<User[]>([]);
  const [usersOnPage, setUsersOnPage] = React.useState<User[]>([]);
  const selectedUser = useSelector(
    (state: RootState) => state.selectUser.selectedUser
  );
  const isUserformOpened: boolean = useSelector(
    (state: RootState) => state.openUserform.isUserformOpened
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    const pageRequest = { pageNumber: 1, pageSize: 100 };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pageRequest),
    };
    fetch("http://localhost:5129/User/getAllUsers", requestOptions)
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
  const onPaginationChange = (page: number, pageSize: number) => {
    const pageRequest = { pageNumber: page, pageSize: pageSize };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pageRequest),
    };
    fetch("http://localhost:5129/User/getAllUsers", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setUsersOnPage(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="list user-list">
        <div className="header1">
          <h1>Users </h1>
          <Button
            onClick={() => {
              dispatch(toogleOpen());
              dispatch(selectUser({ user: undefined }));
            }}
            className="btn"
          >
            Add User
          </Button>
        </div>
        <div className=" list__header user-list__header">
          <span>Name</span>
          <span>Date of birth</span>
          <span>Company</span>
          <span>Position</span>
        </div>
        {usersOnPage.map((user) => (
          <SingleUser key={user.id} user={user} />
        ))}
        <Pagination
          total={users.length}
          showTotal={(total, range) =>
            `Showing ${range[0]} - ${range[1]} of ${total} results`
          }
          defaultPageSize={3}
          onChange={onPaginationChange}
          pageSizeOptions={[2, 3, 5, 10, 20]}
          showSizeChanger
          defaultCurrent={1}
        />
      </div>
      <UserForm user={selectedUser} />
    </>
  );
}
