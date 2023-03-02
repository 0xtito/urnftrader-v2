import { NFT, Trait, TraitStatus } from "../interfaces";

export function getOrganizedTraits(nfts: NFT[]) {
  const traits = nfts.map((nft) => {
    return nft.traits as Trait[];
  });
  const organizedTraits: Array<{ trait_type: string; value: string }> =
    traits.flatMap((allTraits, i) => {
      return allTraits?.map(({ trait_type, value }) => {
        return {
          trait_type,
          value,
        };
      });
    });

  const traitResults: Record<string, Record<string, TraitStatus>> = {};

  organizedTraits.forEach((trait) => {
    const { trait_type, value } = trait;
    if (!traitResults[trait_type]) {
      traitResults[trait_type] = {};
    }
    if (!traitResults[trait_type][value]) {
      traitResults[trait_type][value] = { count: 0, checked: false };
    }
    traitResults[trait_type][value].count++;
  });

  return traitResults;
}
