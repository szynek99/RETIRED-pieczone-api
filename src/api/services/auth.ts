import { SignupInput } from 'types/auth';
import { getUserByUsername, getUserById, createUser } from 'db/services/auth';

export const addUser = (credentials: SignupInput) => createUser(credentials);

export const findUserByUsername = (username: string) => getUserByUsername(username);

export const findUserById = (id: string) => getUserById(id);
