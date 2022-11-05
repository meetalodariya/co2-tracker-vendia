import { NextFunction, Request, Response } from 'express';
import { VendiaClient } from '@vendia/client';

export const updateMotorController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      _id,
      partNumber,
      serialNumber,
      co2,
      dateManufactured,
      imageURL,
      salesPrice,
    } = req.body;
    const { vendiaClient } = req.app.locals as { vendiaClient: VendiaClient };

    await vendiaClient.entities.motor.update({
      _id,
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
