import { ROLES } from 'constants/user';

type RolesTuple = typeof ROLES;
export type Role = RolesTuple[number];

export interface RegisterInput {
  username: string;
  password: string;
  role: Role;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginOutput {
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
