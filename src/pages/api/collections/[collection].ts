import type { NextApiRequest, NextApiResponse } from "next";
import { Alchemy, Network, Nft, NftMetadataBatchToken } from "alchemy-sdk";
import { MarketplaceInfo, NFT, Traits, Collection } from "../../../interfaces";

import { Order, OrdersResponse } from "../../../interfaces";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const reservoirKey = process.env.MAINNET_RESERVOIR_API_KEY || "";
const alchemy = new Alchemy(settings);

const options = {
  method: "GET",
  headers: {
    accept: "*/*",
    "x-api-key": reservoirKey,
  },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const url: string[] = req.url?.split("/") || [""];
  const address: string = url[url.length - 1];

  try {
    // just fetching Pudgy Penguins
    const listedNfts: OrdersResponse = await (
      await fetch(
        `https://api.reservoir.tools/orders/asks/v4?tokenSetId=contract%3A0xBd3531dA5CF5857e7CfAA92426877b022e612cf8`,
        options
      )
    ).json();

    listedNfts.orders.sort((a: Order, b: Order) => {
      return Number(a.price.amount.raw) - Number(b.price.amount.raw);
    });

    const tokens: NftMetadataBatchToken[] = listedNfts.orders.map((nft) => {
      return {
        contractAddress: nft.contract,
        tokenId: nft.criteria.data.token.tokenId,
      };
    });

    const allNftsMetadata = await alchemy.nft.getNftMetadataBatch(tokens);

    // Have to set up return statement with proper types
    // const nfts: NFT[] = listedNfts.orders.map((nft, i) => {
    //   let nftMetadata = allNftsMetadata[i];
    //   return {
    //     name: nftMetadata.title
    //   }
    // });

    return allNftsMetadata
      ? res.status(200).json(allNftsMetadata)
      : res.status(500).json({ message: "data not found" });
  } catch (err) {
    res.status(500).json(err);
  }
}
