import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Company } from "../../models/company";
import { User } from "../../models/user";
import { SingleUser } from "../user/SingleUser";
import { UserForm } from "../user/UserForm";
import { toogleOpen } from "../../redux/slices/openUserformSlice";
import { selectUser } from "../../redux/slices/selectUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { wait } from "@testing-library/user-event/dist/utils";
import { Response } from "../../models/response";
type LayoutType = Parameters<typeof Form>[0]["layout"];

interface CreateCompany {
  name: string;
  city: string;
  country: string;
}

export function CompanyForm() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  const [company, setCompany] = useState<Company>();
  const selectedUser = useSelector(
    (state: RootState) => state.selectUser.selectedUser
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  const params = useParams();
  const edit: boolean = params.id !== undefined;
  const [users, setUsers] = React.useState<Response<User>>({
    responseList: [],
    count: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5129/Company")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data: Response<Company>) => {
        setCompany(data.responseList.find((x) => params.id === x.id));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      name: company?.name,
      city: company?.city,
      country: company?.country,
    });
  }, [company]);

  useEffect(() => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageNumber: 1, pageSize: 100 }),
    };
    if (edit) {
      fetch(
        "http://localhost:5129/User/getUsersByCompany/" + params.id,
        requestOptions
      )
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
    }
  }, [users]);
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: { span: 14, offset: 4 },
        }
      : null;

  const onCreate = (values: CreateCompany) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    fetch("http://localhost:5129/Company/createCompany", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    navigate("/companies");
  };
  const onEdit = (values: CreateCompany) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    fetch("http://localhost:5129/Company/" + params.id, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
        onFinish={edit ? onEdit : onCreate}
        className="form company-form"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true }]}
          initialValue={company?.name}
        >
          <Input placeholder={company !== undefined ? "" : "Name"} />
        </Form.Item>
        <Form.Item label="City" name="city" rules={[{ required: true }]}>
          <Input placeholder={company !== undefined ? "" : "City"} />
        </Form.Item>
        <Form.Item label="Country" name="country" rules={[{ required: true }]}>
          <Input placeholder={company !== undefined ? "" : "Country"} />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {edit && (
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
            {users.responseList.map((user) => (
              <SingleUser key={user.id} user={user} />
            ))}
          </div>
          <UserForm user={selectedUser} company={company} />
        </>
      )}
    </>
  );
}
