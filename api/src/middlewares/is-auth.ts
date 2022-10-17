import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import HttpError from "../exceptions/http-error";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new HttpError("Authorization failed", 401);
      throw error;
    }

    const token = authHeader.split(" ")[1];
    const decodedToken: { [k: string]: string } = jwt.verify(
      token,
      process.env.SECRET_KEY || '43sw3e5fgsx3fq3412'
    ) as JwtPayload;
    
    if (!decodedToken) {
      const error = new HttpError("Authorization failed", 401);
      throw error;
    }
    
    req.userId = decodedToken.userId;
    next();
  } catch (e) {
    next(e);
  }
};
