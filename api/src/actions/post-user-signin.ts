import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import HttpError from '../exceptions/http-error';

interface UserSiginBody {
  username: string;
  password: string;
}

export const signInUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { username, password }: UserSiginBody = req.body;

    if (!username || !password) {
      throw new HttpError("Username or Password can't be empty", 400);
    }

    const token = await authenticateUser(username, password);

    res.json({ token });
  } catch (e) {
    next(e);
  }
};

const authenticateUser = async (
  username: string,
  password: string,
): Promise<string> => {
  try {
    if (username !== 'johndoe') {
      throw new HttpError('User does not exist', 401);
    }

    // Ideally, password should be encrypted and persisted to a DB
    if (password !== 'mypassword') {
      throw new HttpError('Invalid credentials!', 401);
    }

    const token = jwt.sign(
      {
        userId: username,
      },
      process.env.SECRET_KEY || '43sw3e5fgsx3fq3412',
      { expiresIn: '1w' },
    );

    return token;
  } catch (e) {
    throw e;
  }
};
