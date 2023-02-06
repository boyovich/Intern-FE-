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
  const [rangeOfUsers, setRangeOfUsers] = React.useState<number[]>([0, 3]);
  const selectedUser = useSelector(
    (state: RootState) => state.selectUser.selectedUser
  );
  const isUserformOpened: boolean = useSelector(
    (state: RootState) => state.openUserform.isUserformOpened
  );
  const dispatch = useDispatch();
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
  }, [users]);
  const onPaginationChange = (page: number, pageSize: number) => {
    setRangeOfUsers([page * pageSize - pageSize, page * pageSize]);
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
          <span className="user-list__user-field--name">Name</span>
          <span className="user-list__user-field--dob">Date of birth</span>
          <span className="user-list__user-field--company">Company</span>
          <span className="user-list__user-field--position">Position</span>
        </div>
        {users.slice(rangeOfUsers[0], rangeOfUsers[1]).map((user) => (
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
