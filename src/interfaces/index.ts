import { OpenSeaSafelistRequestStatus } from "alchemy-sdk/dist/esm/src/types/types";
import { Dispatch, SetStateAction } from "react";

export interface Collection {
  name: string;
  logo: string | undefined;
  collectionDescription: string | undefined;
  floorPrice: number | undefined;
  verified: OpenSeaSafelistRequestStatus | undefined;
  externalUrl: string | undefined;
  twitterHandle: string | undefined;
  discord: string | undefined;
  nfts: NFT[];
}

export interface MarketplaceInfo {
  name: string | undefined;
  icon: string | undefined;
  assetPage: string | undefined;
}
// needs to be updated
export interface OrganizedTraits {
  [traitType: string]: Record<string, Record<string, TraitStatus>>;
}

export interface Trait {
  value: string;
  trait_type: string;
}

export interface TraitStatus {
  count: number;
  checked: boolean;
}

export interface TraitInfo {
  name: string;
  checked: boolean;
}

export interface UpdateTraitState {
  (
    traits: Record<string, Record<string, TraitStatus>>,
    updatedTrait: TraitInfo
  ): void;
}

export interface UpdateSlideOverState {
  (): boolean;
}

export interface NFT {
  name: string;
  image: string | undefined;
  description: string | undefined;
  traits: Trait[] | undefined;
  tokenId: string;
  price: number | undefined;
  marketplace: MarketplaceInfo | undefined;
  maker: string | undefined;
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

export interface FilterStateProps {
  openSlideOver: boolean;
  handleFilterChange: UpdateTraitState;
  handleSlideOverChange: UpdateSlideOverState;
  collection: Collection;
}
