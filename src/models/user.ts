import { Identifier } from "typescript";

export interface User {
  id : string;
  fullName : string;
  dateOfBirth : Date;
  companyName : string;
  position : string;
}

enum Position {
  Manager,
  SoftwareDeveloper,
  QA,
  Stuff,
}
