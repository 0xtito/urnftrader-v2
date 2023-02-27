export interface Collection {
  name: string;
  logo: string;
  CollectionDescription: string;
  floorPrice: number;
  verified: string;
  externalUrl: string;
  twitter: string;
  discord: string;
  nfts: NFT[];
}

export interface MarketplaceInfo {
  name: string;
  icon: string;
  assetPage: string;
}

export interface Traits {
  value: string;
  value_type: string;
}

export interface NFT {
  name: string;
  image: string;
  description: string;
  traits: Traits[];
  tokenId: string;
  price: number;
  marketplace: MarketplaceInfo;
}

export type PropsObject = {
  children: JSX.Element;
};

export interface Order {
  id: string;
  kind: string;
  side: string;
  tokenSetId: string;
  tokenSetSchemaHash: string;
  contract: string;
  maker: string;
  taker: string;
  price: {
    currency: {
      contract: string;
      name: string;
      symbol: string;
      decimals: number;
    };
    amount: {
      raw: string;
      decimal: number;
      usd: number;
      native: number;
    };
    netAmount: {
      raw: string;
      decimal: number;
      usd: number;
      native: number;
    };
  };
  validFrom: number;
  validUntil: number;
  quantityFilled: number;
  quantityRemaining: number;
  criteria: {
    kind: string;
    data: {
      token: {
        tokenId: string;
        name: string;
        image: string;
      };
      collection: {
        id: string;
        name: string;
        image: string;
      };
    };
  };
  status: string;
  source: Record<string, unknown>;
  feeBps: number;
  feeBreakdown: {
    kind: string;
    recipient: string;
    bps: number;
  }[];
  expiration: number;
  isReservoir: boolean;
  isDynamic: boolean;
  createdAt: string;
  updatedAt: string;
  rawData: Record<string, unknown>;
}

export interface OrdersResponse {
  orders: Order[];
  continuation: string;
}
