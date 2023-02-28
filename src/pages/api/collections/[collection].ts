import type { NextApiRequest, NextApiResponse } from "next";
import { Alchemy, Network, Nft, NftMetadataBatchToken } from "alchemy-sdk";
import { MarketplaceInfo, NFT, Traits, Collection } from "../../../interfaces";
import { paths } from "@reservoir0x/reservoir-sdk";

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

    // An array of nfts listed from a specific collection +
    // with all necessary metadata
    const nfts: NFT[] = allNftsMetadata.map((nft, i) => {
      // nft metadata from alchemy
      const nftListing = listedNfts.orders.find((order) => {
        return order.tokenSetId.split(":")[2] == nft.tokenId;
      });
      // const nftListing = listedNfts.orders[i];
      return {
        name: nft.title,
        image: nft.rawMetadata?.image,
        description: nft.rawMetadata?.description,
        traits: nft.rawMetadata?.attributes,
        tokenId: nft.tokenId,
        price: nftListing?.price.amount.decimal,
        marketplace: {
          name: nftListing?.source.name as string | undefined,
          icon: nftListing?.source.icon as string | undefined,
          assetPage: nftListing?.source.url as string | undefined,
        },
        maker: nftListing?.maker,
      };
    });

    const collection: Collection = {
      name: allNftsMetadata[0].contract.openSea?.collectionName as string,
      logo: allNftsMetadata[0].contract.openSea?.imageUrl,
      collectionDescription: allNftsMetadata[0].contract.openSea?.description,
      floorPrice: allNftsMetadata[0].contract.openSea?.floorPrice,
      verified: allNftsMetadata[0].contract.openSea?.safelistRequestStatus,
      externalUrl: allNftsMetadata[0].contract.openSea?.externalUrl,
      twitterHandle: allNftsMetadata[0].contract.openSea?.twitterUsername,
      discord: allNftsMetadata[0].contract.openSea?.discordUrl,
      nfts,
    };
    return nfts
      ? res.status(200).json(collection)
      : res.status(500).json({ message: "data not found" });
  } catch (err) {
    res.status(500).json(err);
  }
}
