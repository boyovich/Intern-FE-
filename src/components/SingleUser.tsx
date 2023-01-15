import { Button } from "antd";
import * as React from "react";
import { User } from "../models/user";

export interface ISingleUserProps {
  user: User;
}

export function SingleUser(props: ISingleUserProps) {
  return (
    <div className="user">
      <div>
        {props.user.fullName}
        <span> </span>
        {props.user.dateOfBirth.toString().substring(0, 10)}
        <span> </span>
        {props.user.position}
      </div>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </div>
  );
}
