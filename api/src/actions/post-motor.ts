import { NextFunction, Request, Response } from 'express';
import { VendiaClient } from '@vendia/client';

export const addMotorController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      partNumber,
      serialNumber,
      dateManufactured,
      co2,
      imageURL,
      salesPrice,
    } = req.body;
    const { vendiaClient } = req.app.locals as { vendiaClient: VendiaClient };

    await vendiaClient.entities.motor.add({
      partNumber,
      serialNumber,
      co2,
      dateManufactured,
      imageURL,
      salesPrice,
    });

    res.json({ msg: 'Success' });
  } catch (e) {
    next(e);
  }
};
