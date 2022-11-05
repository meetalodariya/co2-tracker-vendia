import { VendiaClient } from '@vendia/client';
import { Request, Response, NextFunction } from 'express';

export const getAllBatteriesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { vendiaClient } = req.app.locals as { vendiaClient: VendiaClient };

    const batteryList = await vendiaClient.entities.battery.list({readMode: 'CACHED'});

    res.json(batteryList?.items);
  } catch (e) {
    next(e);
  }
};
