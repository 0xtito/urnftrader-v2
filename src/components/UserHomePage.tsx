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
import { OwnedNft } from "alchemy-sdk/dist/esm/src/types/types";

import { UserHomePageHeader } from "./UserHomePageHeader";

interface UserHomePageProps {
  nfts: OwnedNft[];
  isLoading: boolean;
}

interface ProfileTabsInterface {
  name: string;
  href: string;
  current: boolean;
}

const tabs: ProfileTabsInterface[] = [
  { name: "Your NFTs", href: "#", current: true },
  { name: "Orders", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
];

export function UserHomePage(props: UserHomePageProps) {
  const { nfts, isLoading } = props;
  const { connector, isConnected, address } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  const {
    connect,
    connectors,
    error,
    isLoading: walletIsLoading,
    pendingConnector,
  } = useConnect();
  const [activeTab, setActiveTab] = useState<string>("Your NFTs");

  return (
    <div className="p-4">
      <UserHomePageHeader
        tabs={tabs}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        address={address!}
      />
    </div>
  );
}
