import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { Button, Modal } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { User } from "../../models/user";
import { toogleOpen } from "../../redux/slices/openUserformSlice";
import { selectUser } from "../../redux/slices/selectUserSlice";
import { UserForm } from "./UserForm";
import { AppDispatch, RootState } from "../../redux/store/store";
export interface ISingleUserProps {
  user: User;
}

export function SingleUser(props: ISingleUserProps) {
  const [deleted, setDeleted] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const deleteUser = () => {
    fetch("http://localhost:5129/User/" + props.user.id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setDeleted(true);
        }
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  const openUser = () => dispatch(toogleOpen);
  return (
    <>
      {!deleted && (
        <div className="user-list__user">
          <span className="user-list__user-field--name">
            {props.user.fullName}
          </span>
          <span className="user-list__user-field--dob">
            {props.user.dateOfBirth.toString().substring(0, 10)}
          </span>
          <span className="user-list__user-field--company">
            {props.user.companyName}
          </span>
          <span className="user-list__user-field--position">
            {props.user.position}
          </span>
          <Button
            className="btn user-list__user--edit"
            onClick={() => {
              dispatch(selectUser({ user: props.user }));
              dispatch(toogleOpen());
            }}
          >
            Edit
          </Button>
          <Button onClick={deleteUser} className="btn user-list__user--delete">
            Delete
          </Button>
        </div>
      )}
    </>
  );
}
