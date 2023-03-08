import type { NextApiRequest, NextApiResponse } from "next";
import { Alchemy, Network, NftMetadataBatchToken } from "alchemy-sdk";

import {
  Order,
  OrdersResponse,
  NFT,
  Trait,
  Collection,
  SimpleHashListingType,
  ListingsResponse,
} from "../../../interfaces";
import { convertIpfsUrl } from "../../../utils";

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
  const address: string = url[url.length - 1];

  const simpleHashUrl: string = `https://api.simplehash.com/api/v0/nfts/listings/${network}/${address}?marketplaces=opensea&order_by=price_asc&limit=50`;

  try {
    const listedNfts: ListingsResponse = await (
      await fetch(simpleHashUrl, options2)
    ).json();
    const tokens: NftMetadataBatchToken[] = listedNfts.listings.map((nft) => {
      const [network, contractAddress, tokenId] = nft.nft_id.split(".");
      return {
        contractAddress,
        tokenId,
      };
    });

    const allNftsMetadata = await alchemy.nft.getNftMetadataBatch(tokens);

    const nfts: NFT[] = allNftsMetadata.map((nft, i) => {
      // nft metadata from alchemy
      const nftListing: SimpleHashListingType | undefined =
        listedNfts.listings.find((order) => {
          const [network, contractAddress, tokenId] = order.nft_id.split(".");
          return tokenId == nft.tokenId;
        });
      return {
        name: nft.title,
        image: convertIpfsUrl(nft.rawMetadata?.image as string),
        description: nft.rawMetadata?.description,
        traits: nft.rawMetadata?.attributes as Trait[],
        tokenId: nft.tokenId,
        price: nftListing?.price,
        marketplace: {
          name: nftListing?.marketplace_id as string | undefined,
          icon: "opensea" as string | undefined,
          assetPage: nftListing?.permalink as string | undefined,
        },
        maker: nftListing?.seller_address,
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

    console.log("new call");

    return nfts
      ? res.status(200).json(collection)
      : res.status(500).json({ message: "data not found" });
  } catch (err) {
    console.log(err);
    console.trace();
    res.status(500).json(err);
  }
}
