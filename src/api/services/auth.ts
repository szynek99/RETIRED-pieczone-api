import { SignupInput } from 'types/auth';
import { getUserByUsername, createUser } from 'db/services/auth';

export const addUser = async (credentials: SignupInput) => await createUser(credentials);

export const getUser = async (username: string) => await getUserByUsername(username);
