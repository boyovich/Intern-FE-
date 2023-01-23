import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../models/user";
import { Company } from "../../models/company";
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
  const comp: boolean = params.companyId !== undefined;
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
        console.log(companies.find((c) => c.id === params.companyId)?.name);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(comp);
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
    fetch("http://localhost:5129/User", requestOptions).then((response) =>
      response.json()
    );
    navigate("/users");
  };
  const onEdit = (values: any) => {
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
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true }]}
      >
        <Input
          placeholder={
            edit
              ? user?.fullName?.substring(0, user?.fullName?.indexOf(" "))
              : "First name"
          }
        />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
        <Input
          placeholder={
            edit
              ? user?.fullName?.substring(user?.fullName?.indexOf(" ") + 1)
              : "Last name"
          }
        />
      </Form.Item>
      <Form.Item
        label="Company Name"
        name="companyId"
        rules={[{ required: true }]}
        initialValue={params.companyId}
      >
        {comp ? (
          <Select
            style={{ width: 120 }}
            disabled
            options={[
              {
                value: params.companyId,
                label: companies.find((c) => c.id === params.companyId)?.name,
              },
            ]}
          />
        ) : (
          <Select placeholder={edit ? user?.companyName : "Company"}>
            {companies.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item
        label="Date of birth"
        name="dateOfBirth"
        rules={[{ required: true }]}
      >
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
      <Form.Item label="Position" name="position" rules={[{ required: true }]}>
        <Select placeholder={edit ? user?.position : "Position"} allowClear>
          <Option value={0}>Manager</Option>
          <Option value={1}>Software developer</Option>
          <Option value={2}>Quality assurance</Option>
          <Option value={3}>Staff</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true }]}
      >
        <Input placeholder={edit ? user?.phoneNumber : "Phone Number"} />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
