import User, { UserInput } from 'db/models/user';

export const getUserByUsername = (username: string) =>
  User.findOne({ where: { username }, raw: true });

export const getUserById = (id: string) => User.findByPk(id, { raw: true });

export const addUser = (credentials: UserInput) => User.create(credentials);

export const resetUser = () => User.truncate();
