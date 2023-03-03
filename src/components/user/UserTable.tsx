import { Button, PaginationProps } from "antd";
import Table, { ColumnsType, TableProps } from "antd/es/table";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../models/user";
import { Response } from "../../models/response";
import { selectUser } from "../../redux/slices/selectUserSlice";
import { toogleOpen } from "../../redux/slices/openUserformSlice";
import { RootState } from "../../redux/store/store";
import { UserForm } from "./UserForm";
import { is } from "immer/dist/internal";
export interface IUserTableProps {}
type UserRow = {
  key: string;
  fullName: string;
  dateOfBirth: string;
  companyName: string;
  position: string;
};
export function UserTable(props: IUserTableProps) {
  const [users, setUsers] = React.useState<Response<User>>({
    responseList: [],
    count: 0,
  });
  const [dataSource, setDataSource] = React.useState<UserRow[]>([]);
  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (state: RootState) => state.selectUser.selectedUser
  );

  React.useEffect(() => {
    const pageRequest = { pageNumber: 1, pageSize: 2 };
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
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(() => {
    setDataSource(
      users?.responseList.map((u) => ({
        key: u.id,
        fullName: u.fullName,
        dateOfBirth: u.dateOfBirth.toString().substring(0, 10),
        companyName: u.companyName,
        position: u.position,
      }))
    );
  }, [users]);
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
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = (key: React.Key) => {
    fetch("http://localhost:5129/User/" + key, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  const columns: ColumnsType<UserRow> = [
    {
      key: "fullName",
      dataIndex: "fullName",
      title: "Full Name",
      sorter: true,
    },
    { key: "dateOfBirth", dataIndex: "dateOfBirth", title: "Date of Birth" },
    {
      key: "companyName",
      dataIndex: "companyName",
      title: "Company Name",
      sorter: true,
    },
    { key: "position", dataIndex: "position", title: "Position", sorter: true },
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
                  user: users.responseList.find(
                    (u) => u.id === record.key.toString()
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
  function sortProperty(s: string | undefined) {
    switch (s) {
      case "companyName":
        return "CompanyId";
      case "fullName":
        return "FirstName";
      case "position":
        return "Position";
      default:
        return s;
    }
  }
  const onChange: TableProps<UserRow>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (sorter.hasOwnProperty("column")) {
      const request = {
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
        sortBy:
          sortProperty(
            Object.getOwnPropertyDescriptor(sorter, "columnKey")?.value
          ) + Object.getOwnPropertyDescriptor(sorter, "order")?.value,
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      };
      fetch("http://localhost:5129/User/getUsers", requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          setUsers(data);
        })
        .catch((err) => console.log(err));
    }
    console.log(
      pagination,
      filters,
      sorter,
      extra,
      sortProperty(
        Object.getOwnPropertyDescriptor(sorter, "columnKey")?.value
      ) + Object.getOwnPropertyDescriptor(sorter, "order")?.value
    );
  };
  return (
    <>
      <Button
        onClick={() => {
          dispatch(toogleOpen());
          dispatch(selectUser({ user: undefined }));
        }}
        className="btn"
      >
        Add User
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="list user-list"
        onChange={onChange}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 2,
          total: users.count,
          onChange: onPaginationChange,
          showSizeChanger: true,
          pageSizeOptions: [2, 3, 5, 10],
          showTotal: (total, range) =>
            `Showing ${range[0]} - ${range[1]} of ${total} results`,
        }}
      ></Table>
      <UserForm user={selectedUser} />
    </>
  );
}
