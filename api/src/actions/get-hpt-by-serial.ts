import { VendiaClient } from '@vendia/client';
import { Request, Response, NextFunction } from 'express';
import HttpError from '../exceptions/http-error';

export const getHptBySerialNumberController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const serialNum = req.params.serialNum;
    const { vendiaClient } = req.app.locals as { vendiaClient: VendiaClient };

    const hptList = await vendiaClient.entities.hornetPowerTools.list({
      filter: {
        serialNumber: {
          eq: serialNum,
        },
      },
    });

    const hptRecord = hptList?.items[0];

    if (!hptRecord) {
      throw new HttpError("record not found", 404);
    }

    if (hptRecord._id) {
      delete hptRecord._id;
    }

    if (hptRecord._owner) {
      delete hptRecord._owner;
    }

    res.json(hptRecord);
  } catch (e) {
    next(e);
  }
};
