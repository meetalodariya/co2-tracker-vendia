import { VendiaClient } from '@vendia/client';
import { Request, Response, NextFunction } from 'express';

export const getAllTransportsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.query;
    const { vendiaClient } = req.app.locals as { vendiaClient: VendiaClient };

    const transportationMethodFilter = query.show
      ? { transportationMethod: { eq: query.show } }
      : {};

    console.log(transportationMethodFilter);

    const motorsList = await vendiaClient.entities.transportation.list({
      filter: {
        ...transportationMethodFilter,
      },
    });

    res.json(motorsList?.items);
  } catch (e) {
    next(e);
  }
};
