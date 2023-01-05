import { Identifier } from "typescript";

export interface User {
  firstName: string;
  lastName: string;
  companyId: string;
  dateOfBirth: Date;
  position: Position;
  phoneNumber: string;
}

enum Position {
  Manager,
  SoftwareDeveloper,
  QA,
  Stuff,
}
