import { SignupInput } from 'types/auth';
import { getUserByUsername, createUser } from 'db/services/auth';

export const addUser = async (credentials: SignupInput) => {
  try {
    await createUser(credentials);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};

export const findUser = async (username: string) => {
  try {
    const user = await getUserByUsername(username);

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject();
  }
};
