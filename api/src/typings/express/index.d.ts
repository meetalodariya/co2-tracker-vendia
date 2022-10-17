import { VendiaClient } from '@vendia/client';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
    interface Application {
      locals: {
        vendiaClient: VendiaClient;
      };
    }
  }
}
