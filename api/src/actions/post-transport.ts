import { NextFunction, Request, Response } from 'express';
import { VendiaClient } from '@vendia/client';
import { v4 } from 'uuid';

export const addTransportController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      co2,
      transportationMethod,
      origin,
      destination,
      vehicleId,
      shipmentId,
      charge,
      duration,
      distance,
      imageURL,
    } = req.body;
    const distanceInMiles = distance * 0.000621371192;
    const { vendiaClient } = req.app.locals as { vendiaClient: VendiaClient };

    await vendiaClient.entities.transportation.add({
      trackingId: v4(),
      co2,
      imageURL,
      transportationMethod,
      origin,
      destination,
      vehicleId,
      shipmentId,
      charge,
      duration,
      distance,
      bill: Math.floor(distanceInMiles * charge) + ' USD',
      dateArrived: new Date().toISOString().split('T')[0],
      dateShipped: new Date().toISOString().split('T')[0],
    });

    res.json({ msg: 'Success' });
  } catch (e) {
    next(e);
  }
};
