import { VendiaClient } from '@vendia/client';
import { Request, Response, NextFunction } from 'express';

export const getAllMotorsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { vendiaClient } = req.app.locals as { vendiaClient: VendiaClient };

    const motorsList = await vendiaClient.entities.motor.list();

    res.json(motorsList?.items);
  } catch (e) {
    next(e);
  }
};
