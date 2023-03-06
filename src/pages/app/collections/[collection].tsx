import { Network, Alchemy } from "alchemy-sdk";
import useSWR, { Key, MutatorCallback } from "swr";
import useSWRMutation from "swr/mutation";
import Link from "next/link";
import ContentLoader from "react-content-loader";
import { useState, Fragment, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import {
  Collection,
  TraitStatus,
  OrganizedTraits,
  TraitInfo,
  UpdateTraitState,
} from "../../../interfaces";
import {
  CollectionHeader,
  FilterSlideOver,
  NftCatalogue,
  OrderSection,
} from "../../../components";
import { MainAppLayout, DashboardLayout } from "../../../layouts";
import { getOrganizedTraits } from "../../../utils";
import { FilterStatus } from "../../../contexts/FilterStatus";

const MyCardLoader = () => <ContentLoader />;

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

/**
 * This will be the default page for the collection page
 * This will display the Pudgy Penguins at first
 * Will evolve to display trending/hottest NFTs
 */
// pudgy penguin contract: 0xBd3531dA5CF5857e7CfAA92426877b022e612cf8

interface CollectionRouterQuery {
  collection: string;
}

interface CollectionPageProps {
  id: string;
}

export default function CollectionPage(props: CollectionPageProps) {
  const [openSlideOver, setOpenSlideOver] = useState(false);
  const [collectionData, setCollectionData] = useState<Collection | null>(null);
  const [filteredTraits, setFilteredTraits] = useState<
    Record<string, Record<string, TraitStatus>>
  >({});

  const { id } = props;

  const handleSlideOverChange = () => {
    setOpenSlideOver(!openSlideOver);
    // returns updated openSlideOver
    return openSlideOver;
  };

  const handleFilterChange = (
    traits: Record<string, Record<string, TraitStatus>>,
    updatedTrait: TraitInfo
  ) => {
    const { name: identifier, checked } = updatedTrait;

    const [traitType, traitName] = identifier.split("-");

    traits[traitType][traitName].checked = checked;

    setFilteredTraits(traits);
  };

  const defaultCollection: boolean = false;
  const fetchListedItems = (url: string) =>
    fetch(url).then((res) => res.json());

  const uid: string = defaultCollection
    ? "/api/collections/0xBd3531dA5CF5857e7CfAA92426877b022e612cf8"
    : `/api/collections/${id}`;

  const {
    data,
    isLoading,
    isValidating,
    error,
    mutate,
  }: {
    data: Collection;
    isLoading: boolean;
    isValidating: boolean;
    error: any;
    mutate: MutatorCallback;
  } = useSWR(uid, fetchListedItems, { revalidateOnFocus: false });

  const handleRefreshData = {
    startRefresh: () => {
      mutate();
    },
    isValidating,
  };

  useEffect(() => {
    if (data) {
      setFilteredTraits(getOrganizedTraits(data.nfts));
    }
  }, [data]);

  if (isLoading || error) {
    return (
      <MainAppLayout
        sideBarJSX={
          <div className="h-full rounded-lg border-2 border-dashed border-gray-200" />
        }
      >
        <ContentLoader />
      </MainAppLayout>
    );
  }

  if (error) {
    return (
      <MainAppLayout
        sideBarJSX={
          <div className="h-full rounded-lg border-2 border-dashed border-gray-200" />
        }
      >
        <p>error</p>
      </MainAppLayout>
    );
  }

  if (data) {
    const sideBarJSX = <OrderSection />;

    return (
      <FilterStatus.Provider value={filteredTraits}>
        <MainAppLayout sideBarJSX={sideBarJSX}>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl py-4 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">NFTs</h2>
              <CollectionHeader
                openSlideOver={openSlideOver}
                handleFilterChange={handleFilterChange}
                handleSlideOverChange={handleSlideOverChange}
                handleRefreshData={handleRefreshData}
                collection={data}
              />
              <FilterSlideOver
                openSlideOver={openSlideOver}
                handleFilterChange={handleFilterChange}
                handleSlideOverChange={handleSlideOverChange}
                collection={data}
              />
              {/* nft catalogue */}
              <NftCatalogue data={data} />
            </div>
          </div>

          {/* Spinner loader
          <div className="flex items-center justify-center">
            {isLoading && !error && !data && (
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current text-gray-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            )}
            {!isLoading && !error && <p>{data}</p>}
          </div> */}
        </MainAppLayout>
      </FilterStatus.Provider>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Fetch data and return props
  // const data = await fetchMyData();
  const id = context.query.collection as string;
  return {
    props: {
      id,
    },
  };
}
