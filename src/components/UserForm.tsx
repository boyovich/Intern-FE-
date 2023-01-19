import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Radio,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../models/user";
import { Company } from "../models/company";
import moment from "moment";
type LayoutType = Parameters<typeof Form>[0]["layout"];

interface CreateUser {
  firstName: string;
  lastName: string;
  companyId: string;
  dateOfBirth: string;
  position: number;
  phoneNumber: string;
}
const { Option } = Select;
export function UserForm() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  const [user, setUser] = useState<User>();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [date, setDate] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams();
  const edit: boolean = params.id !== undefined;
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

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

  React.useEffect(() => {
    fetch("http://localhost:5129/User/getAllUsers")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data: User[]) => {
        setUser(data.find((x) => x.id === params.id));
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("http://localhost:5129/Company")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setCompanies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onCreate = (values: any) => {
    console.log(values);
    let user: CreateUser = values;
    user.dateOfBirth = date;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    fetch("http://localhost:5129/User", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    navigate("/users");
  };
  const onEdit = (values: any) => {
    console.log(values);
    console.log(date);
    let user: CreateUser = values;
    user.dateOfBirth = date;
    console.log(user);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:5129/User/" + params.id, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
      onFinish={edit ? onEdit : onCreate}
    >
      <Form.Item label="First Name" name="firstName">
        <Input
          placeholder={
            edit
              ? user?.fullName?.substring(0, user?.fullName?.indexOf(" "))
              : "First name"
          }
        />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName">
        <Input
          placeholder={
            edit
              ? user?.fullName?.substring(user?.fullName?.indexOf(" ") + 1)
              : "Last name"
          }
        />
      </Form.Item>
      <Form.Item label="Company Name" name="companyId">
        <Select placeholder={user?.companyName}>
          {companies.map((c) => (
            <Option key={c.id} value={c.id}>
              {c.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Date of birth" name="dateOfBirth">
        <DatePicker
          placeholder={user?.dateOfBirth.toString().substring(0, 10)}
          picker="date"
          format={"YYYY-MM-DD"}
          onChange={(_, dateString) => {
            setDate(dateString);
          }}
          allowClear
        />
      </Form.Item>
      <Form.Item label="Position" name="position">
        <Select placeholder={user?.position} allowClear>
          <Option value={0}>Manager</Option>
          <Option value={1}>Software developer</Option>
          <Option value={2}>Quality assurance</Option>
          <Option value={3}>Staff</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Phone Number" name="phoneNumber">
        <Input placeholder={user?.phoneNumber} />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
