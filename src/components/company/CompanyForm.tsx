import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Company } from "../../models/company";
import { User } from "../../models/user";
import { SingleUser } from "../user/SingleUser";
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
  const navigate = useNavigate();
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  const params = useParams();
  const edit: boolean = params.id !== undefined;
  const [users, setUsers] = React.useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:5129/Company")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data: Company[]) => {
        setCompany(data.find((x) => params.id === x.id));
      })
      .catch((err) => {
        console.log(err);
      });
    if (edit) {
      fetch("http://localhost:5129/User/getUsersByCompany/" + params.id)
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
  }, []);
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
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder={company !== undefined ? company.name : "name"} />
        </Form.Item>
        <Form.Item label="City" name="city" rules={[{ required: true }]}>
          <Input placeholder={company !== undefined ? company.city : "city"} />
        </Form.Item>
        <Form.Item label="Country" name="country" rules={[{ required: true }]}>
          <Input
            placeholder={company !== undefined ? company.country : "country"}
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {edit && (
        <div>
          <Button
            onClick={() => {
              navigate("/create-user/" + company?.id);
            }}
          >
            Add
          </Button>
          <div className="user-list">
            {users.map((user) => (
              <SingleUser key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
