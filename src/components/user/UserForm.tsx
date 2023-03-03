import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../models/user";
import { Company } from "../../models/company";
import { Response } from "../../models/response";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch } from "react-redux/es/exports";
import { toogleOpen } from "../../redux/slices/openUserformSlice";
import { CompanyForm } from "../company/CompanyForm";
import { isPropertyAssignment } from "typescript";
import moment from "moment";
type LayoutType = Parameters<typeof Form>[0]["layout"];

interface CreateUser {
  firstName: string;
  lastName: string;
  companyId: string;
  dateOfBirth?: string;
  position: number;
  phoneNumber: string;
}
interface IUserFormProps {
  user?: User;
  company?: Company;
}
const { Option } = Select;
function positions(p: string | undefined): number | undefined {
  if (typeof p === "undefined") return undefined;
  switch (p) {
    case "Manager":
      return 0;
    case "Software Developer":
      return 1;
    case "Quality assurance":
      return 2;
    case "Staff":
      return 3;
    default:
      return undefined;
  }
}
export function UserForm(props: IUserFormProps) {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  const [companies, setCompanies] = useState<Response<Company>>({
    responseList: [],
    count: 0,
  });
  const [date, setDate] = useState<string>("");
  const params = useParams();
  const isUserformOpened: boolean = useSelector(
    (state: RootState) => state.openUserform.isUserformOpened
  );
  const dispatch: AppDispatch = useDispatch();
  const edit: boolean = props.user !== undefined;
  const comp: boolean = props.company !== undefined;
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
      body: JSON.stringify(user),
    };
    fetch("http://localhost:5129/User", requestOptions).then((response) =>
      response.json()
    );
  };
  const onEdit = (values: any) => {
    let user: CreateUser = values;
    user.dateOfBirth = props.user?.dateOfBirth.toString().substring(0, 10);
    if (date) {
      user.dateOfBirth = date;
    }
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:5129/User/" + props.user?.id, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <Modal
      open={isUserformOpened}
      onCancel={() => dispatch(toogleOpen())}
      onOk={() => {
        form.submit();
      }}
      destroyOnClose
      closable={false}
      className="user-modal"
    >
      <Form
        //{...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
        onFinish={edit ? onEdit : onCreate}
        preserve={false}
        className="form user-form"
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true }]}
          className="form-item"
          initialValue={
            edit
              ? props.user?.fullName?.substring(
                  0,
                  props.user?.fullName?.indexOf(" ")
                )
              : ""
          }
        >
          <Input
            placeholder={edit ? "" : "First name"}
            className="user-form__item--first-name"
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true }]}
          className="form-item"
          initialValue={
            edit
              ? props.user?.fullName?.substring(
                  props.user?.fullName?.indexOf(" ") + 1
                )
              : ""
          }
        >
          <Input
            placeholder={edit ? "" : "Last name"}
            className="user-form__item--last-name"
          />
        </Form.Item>
        <Form.Item
          label="Company Name"
          name="companyId"
          rules={[{ required: true }]}
          className="form-item"
          initialValue={
            companies.responseList.find(
              (c) => c.name == props.user?.companyName
            )?.id
          }
        >
          {comp ? (
            <Select
              style={{ width: 120 }}
              disabled
              options={[
                {
                  value: props.company?.id,
                  label: props.company?.name,
                },
              ]}
              className="user-form__item--company"
            />
          ) : (
            <Select
              placeholder={edit ? "" : "Company"}
              className="user-form__item--company"
            >
              {companies.responseList.map((c) => (
                <Option
                  key={c.id}
                  value={c.id}
                  className="user-form__item--company"
                >
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
          className="form-item"
          initialValue={moment(props.user?.dateOfBirth)}
        >
          <DatePicker
            picker="date"
            format={"YYYY-MM-DD"}
            onChange={(date, dateString) => {
              setDate(dateString);
            }}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="Position"
          name="position"
          rules={[{ required: true }]}
          className="form-item"
          initialValue={positions(props.user?.position)}
        >
          <Select
            className="user-form__item--position"
            placeholder={edit ? props.user?.position : "Position"}
            allowClear
          >
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
          className="form-item"
          initialValue={props.user?.phoneNumber}
        >
          <Input
            className="user-form__item--phone-number"
            placeholder={edit ? "" : "Phone Number"}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
