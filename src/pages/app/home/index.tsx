import { createPublicClient, http } from "viem";
import { mainnet, polygonMumbai } from "viem/chains";
import { Fragment, useState, FormEvent, useRef, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import useSWR, { MutatorCallback } from "swr";

import { ConnectWallet, SignIn, UserHomePage } from "../../../components";
import { MainAppLayout } from "../../../layouts";
import { OwnedNft } from "alchemy-sdk/dist/esm/src/types/types";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const client = createPublicClient({
  chain: polygonMumbai,
  transport: http(),
});

const fetchListedItems = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  /**
   * This page will be the default page for users.
   * They will either be presented either of two different layouts:
   *      1. To create their smart contract account which will be how they use the app
   *      2. Their profile, which includes
   *          - active/completed orders
   *          - there nft collection
   */
  const { connector, isConnected, address } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  const {
    connect,
    connectors,
    error: walletConnectError,
    pendingConnector,
  } = useConnect();
  const router = useRouter();
  const search = useRef("");

  interface OwnedNftsSWR {
    data: OwnedNft[];
    isLoading: boolean;
    isValidating: boolean;
    error: any;
    mutate: MutatorCallback;
  }

  const {
    data,
    isLoading,
    isValidating,
    error: dataFetchError,
    mutate,
  }: OwnedNftsSWR = useSWR(
    isConnected && address
      ? `/api/users/nfts/0xD2128b1C22Bb80a4dae69fe149cD6fE9Ba7eB4aa`
      : null,
    fetchListedItems,
    { revalidateOnFocus: false }
  );

  //   useEffect(() => {
  //     console.log(isConnected);
  //   }, [isConnected]);

  const navigation = [
    { name: "Home", href: "#", icon: HomeIcon, current: false },
    { name: "Profile", href: "#", icon: UserIcon, current: false },
    {
      name: "Collections",
      href: router.pathname.startsWith("app")
        ? "/collections"
        : "/app/collections",
      icon: UsersIcon,
      current: true,
    },
    { name: "Watchlist", href: "#", icon: FolderIcon, current: false },
  ];

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.keys(router.query).length == 0) {
      router.push(`/collections/${search.current}`);
    }
    router.push(search.current);
  };

  return (
    <MainAppLayout>
      <Fragment>
        {isConnected ? (
          <UserHomePage nfts={data} isLoading={isLoading} />
        ) : (
          <SignIn />
        )}
      </Fragment>
    </MainAppLayout>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   // Fetch data and return props
//   // const data = await fetchMyData();
//   console.log(context.req.);
//   const id = context.query.collection as string;
//   return {
//     props: {},
//   };
// }
