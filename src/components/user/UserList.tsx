import { Button, Pagination } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { User } from "../../models/user";
import { Response } from "../../models/response";
import { toogleOpen } from "../../redux/slices/openUserformSlice";
import { selectUser } from "../../redux/slices/selectUserSlice";
import { RootState } from "../../redux/store/store";
import { SingleUser } from "./SingleUser";
import { UserForm } from "./UserForm";

export interface IUserListProps {}
type UserRow = {
  key: string;
  fullName: string;
  dateOfBirth: Date;
  companyName: string;
  position: string;
};
export function UserList(props: IUserListProps) {
  const [usersOnPage, setUsersOnPage] = React.useState<Response<User>>({
    responseList: [],
    count: 0,
  });
  const selectedUser = useSelector(
    (state: RootState) => state.selectUser.selectedUser
  );
  const dispatch = useDispatch();
  const onPaginationChange = (page: number, pageSize: number) => {
    const pageRequest = { pageNumber: page, pageSize: pageSize };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pageRequest),
    };
    fetch("http://localhost:5129/User/getUsers", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setUsersOnPage(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = (id: React.Key) => {
    fetch("http://localhost:5129/User/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  const dataSource = usersOnPage?.responseList.map((u) => ({
    key: u.id,
    fullName: u.fullName,
    dateOfBirth: u.dateOfBirth,
    companyName: u.companyName,
    position: u.position,
  }));
  const columns: ColumnsType<UserRow> = [
    { key: "fullName", dataIndex: "fullName", title: "Full Name" },
    { key: "dateOfBirth", dataIndex: "dateOfBirth", title: "Date of Birth" },
    { key: "companyName", dataIndex: "companyName", title: "Company Name" },
    { key: "position", dataIndex: "position", title: "Position" },
    {
      key: "actions",
      dataIndex: "actions",
      title: "Actions",
      render: (_, record: { key: React.Key }) => (
        <>
          <Button
            className="btn user-list__user--edit"
            onClick={() => {
              dispatch(
                selectUser({
                  user: usersOnPage?.responseList.find(
                    (u) => u.id == record.key.toString()
                  ),
                })
              );
              dispatch(toogleOpen());
            }}
          >
            Edit
          </Button>
          <Button
            className="btn user-list__user--delete"
            onClick={() => deleteUser(record.key)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
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
        {usersOnPage?.responseList.map((user) => (
          <SingleUser key={user.id} user={user} />
        ))}
        <Pagination
          total={usersOnPage?.count}
          showTotal={(total, range) =>
            `Showing ${range[0]} - ${range[1]} of ${total} results`
          }
          defaultPageSize={3}
          onChange={onPaginationChange}
          pageSizeOptions={[2, 3, 5, 10, 20]}
          showSizeChanger
        />
      </div>
      <UserForm user={selectedUser} />
    </>
  );
}
