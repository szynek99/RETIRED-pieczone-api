import { ROLES } from 'constants/auth';

type RolesTuple = typeof ROLES;
export type Role = RolesTuple[number];

export interface SignupInput {
  username: string;
  password: string;
  role: Role;
}

export interface SigninInput {
  username: string;
  password: string;
}

export interface SigninOutput {
  username: string;
  password: string;
  role: string;
}

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  role: Role;
}

interface JwtPayload {
  id: string;
}
