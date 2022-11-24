import { NextFunction, Request, Response } from 'express';
import { VendiaClient } from '@vendia/client';

export const addHptController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { transport, toolType, serialNumber, imageURL, components } =
      req.body;
    const { vendiaClient } = req.app.locals as { vendiaClient: VendiaClient };

    await vendiaClient.entities.hornetPowerTools.add({
      transport,
      toolType,
      serialNumber,
      imageURL,
      components,
    });

    res.json({ msg: 'Success' });
  } catch (e) {
    next(e);
  }
};
