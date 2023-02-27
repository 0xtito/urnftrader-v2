import { Network, Alchemy } from "alchemy-sdk";
import CollectionsLayout from "../../../layouts/CollectionsLayout";
import useSWR from "swr";

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

const fetchListedItems = (...args: [RequestInfo, RequestInit]) =>
  fetch(...args).then((res) => res.json());

export default function CollectionsIndexPage() {
  // const { data, isLoading, error } = useSWR(
  //   "/api/0xBd3531dA5CF5857e7CfAA92426877b022e612cf8",
  //   fetchListedItems
  // );

  // console.log(data);

  return (
    <CollectionsLayout sideBarJSX={<p>hey</p>}>
      <></>
      {/* <div className="flex items-center justify-center">
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
    </CollectionsLayout>
  );
}
