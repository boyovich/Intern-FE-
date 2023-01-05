import * as React from "react";
import { User } from "../models/user";

export interface IAppProps {
  user: User;
}

export function SingleUser(props: IAppProps) {
  return <div>{props.user.firstName}</div>;
}
