import { createVendiaClient, VendiaClient } from '@vendia/client';

export class Vendia {
  private client: VendiaClient | null = null;

  getClient() {
    return this.client;
  }

  init() {
    if (!this.client) {
      const client = createVendiaClient({
        apiUrl: process.env.VENDIA_GRAPHQL_URL,
        websocketUrl: process.env.VENDIA_GRAPHQL_WEBSOCKET_URL,
        apiKey: process.env.VENDIA_API_KEY,
      });

      this.client = client;
    }
  }
}
