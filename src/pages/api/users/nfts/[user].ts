import type { NextApiRequest, NextApiResponse } from "next";
import { Alchemy, Network, NftMetadataBatchToken } from "alchemy-sdk";
import { ethers } from "ethers";

import {
  Order,
  OrdersResponse,
  NFT,
  Trait,
  Collection,
  SimpleHashListingType,
  ListingsResponse,
} from "../../../../interfaces";
import { convertIpfsUrl } from "../../../../utils";
import { OwnedNft } from "alchemy-sdk/dist/esm/src/types/types";

// just for testing
const useMainnet = true;
let network: string = useMainnet ? "ethereum" : "polygon-mumbai";
const settings = useMainnet
  ? {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_MAINNET, // Replace with your Alchemy API Key.
      network: Network.ETH_MAINNET, // Replace with your network.
    }
  : {
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_GOERLI, // Replace with your Alchemy API Key.
      network: Network.ETH_GOERLI, // Replace with your network.
    };

const alchemy = new Alchemy(settings);

const simpleHashKey = process.env.SIMPLEHASH_API_KEY!;

const options2 = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": simpleHashKey,
  },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const url: string[] = req.url?.split("/") || [""];
  const userAddress: string = url[url.length - 1];
  const nfts: OwnedNft[] = [];

  const nftsIterator = alchemy.nft.getNftsForOwnerIterator(userAddress);

  for await (let nft of nftsIterator) {
    nfts.push(nft);
  }

  return nfts
    ? res.status(200).json(nfts)
    : res.status(500).json({ message: "data not found" });
}
