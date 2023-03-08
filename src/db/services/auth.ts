import { ApiError } from 'api/utils/Error';
import User, { UserInput, UserOuput } from 'db/models/user';

export const getUserByUsername = async (username: string): Promise<UserOuput | null> => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return null;
    }

    return user.get({ plain: true });
  } catch (error) {
    console.debug(error);
    throw new ApiError('User find');
  }
};

export const getUserById = async (id: string): Promise<UserOuput | null> => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    return user.get({ plain: true });
  } catch {
    throw new ApiError('User find');
  }
};

export const addUser = async (credentials: UserInput): Promise<void> => {
  try {
    await User.create(credentials);
    return;
  } catch {
    throw new ApiError('User create');
  }
};

export const resetUser = async (): Promise<void> => {
  try {
    await User.truncate();
    return;
  } catch {
    throw new ApiError('User clear');
  }
};
