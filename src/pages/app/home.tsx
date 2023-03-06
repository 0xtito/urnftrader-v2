import { ethers } from "ethers";
import { Fragment, useState, FormEvent, useRef, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
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

import { ConnectWallet, SignIn } from "../../components";
import { MainAppLayout } from "../../layouts";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  /**
   * This page will be the default page for users.
   * They will either be presented either of two different layouts:
   *      1. To create their smart contract account which will be how they use the app
   *      2. Their profile, which includes
   *          - active/completed orders
   *          - there nft collection
   */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const search = useRef("");

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

  useEffect(() => {}, []);

  return (
    <MainAppLayout>
      <Fragment>
        <SignIn />
      </Fragment>
    </MainAppLayout>
  );
}

// export function getServerSideProps() {}
