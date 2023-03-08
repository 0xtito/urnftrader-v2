import { Fragment, useEffect, useState } from "react";
import { createClient, http } from "viem";
import {
  useAccount,
  useConnect,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useSigner,
} from "wagmi";
import { mainnet, polygonMumbai } from "viem/chains";
import { ZeroDevSigner } from "@zerodevapp/sdk";
import { ExtractAbiFunctionNames } from "abitype";
import { seaportAbi } from "abitype/test";
import { ethers } from "ethers";
import { createWalletClient, custom, getAccount } from "viem";

const walletClient = createWalletClient({
  chain: polygonMumbai,
  transport: http(process.env.NEXT_PUBLIC_ALCHEMY_API_URL_MUMBAI!),
});

const seaportModule: string = "0x00000000006c3852cbEf3e08E8dF289169EdE581";

type SeaportAbiTest = ExtractAbiFunctionNames<typeof seaportAbi, "view">;
//   ^?

export function BuySection() {
  const { connector, isConnected, address } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  const {
    connect,
    connectors,
    error,
    isLoading: walletIsLoading,
    pendingConnector,
  } = useConnect();
  const { data: signer } = useSigner<ZeroDevSigner>();

  const handleLimitOrder = async (e: React.FormEvent<HTMLButtonElement>) => {
    // disabling this for the time being
    // e.preventDefault();
    // get the price in the input field and print it to the console
    // const price = document.getElementById("price") as HTMLInputElement;
    // const signer = getZeroDevSigner();
    // await signer?.enableModule(seaportModule);
  };

  return (
    <Fragment>
      <div className="flex-wrap m-4">
        <div className="">
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Price
          </label>
          <div id="Price" className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1.5">
              <img
                className="h-5 w-5"
                src="https://raw.githubusercontent.com/reservoirprotocol/marketplace-v2/main/public/icons/currency/eth.png"
              />
            </div>
            <input
              type="text"
              name="price"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.23"
              aria-describedby="price-currency"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                ETH
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex place-content-center">
          <button
            onClick={handleLimitOrder}
            type="button"
            className="rounded-md bg-indigo-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Order
          </button>
        </div>
      </div>
    </Fragment>
  );
}
