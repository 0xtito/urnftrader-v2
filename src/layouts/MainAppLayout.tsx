import { Fragment, useState, useEffect, useRef, FormEvent } from "react";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { useRouter } from "next/router";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  HomeIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  UsersIcon,
  FolderIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ConnectWallet } from "../components";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  children: JSX.Element;
  sideBarJSX?: JSX.Element;
};

export function MainAppLayout(props: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { connector, isConnected, address } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  const { data: ensName } = useEnsName({ address });

  const router = useRouter();
  const search = useRef("");

  const navigation = [
    {
      name: "Home",
      href: router.pathname.startsWith("app") ? "app/collections" : "/app/home",
      icon: HomeIcon,
      current: false,
    },
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

  // console.log(router.pathname);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (router.pathname.startsWith("/app/collections")) {
    //   router.push(`/collections/${search.current}`);
    // } else if (router.pathname.startsWith("/app/home")) {
    //   router.push(`/collections/${search.current}`);
    // }
  };

  useEffect(() => {
    if (ensName) {
      setUserAddress(ensName);
    } else {
      setUserAddress(`${address?.slice(0, 6)}...`);
    }
  }, [isConnected]);

  return (
    <Fragment>
      <div className="flex h-screen ">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <Link key="home" href="/app">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-300"
                                : "text-gray-400 group-hover:text-gray-300",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
              <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
                <Link key="home" href="/app">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </Link>
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto">
                <nav className="flex-1 space-y-1 px-2 py-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-300"
                            : "text-gray-400 group-hover:text-gray-300",
                          "mr-3 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Search bar container*/}
        <div className="flex flex-col lg:pl-64 w-full">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            {/* Sidebar pop up button on mobile */}
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search Bar + Wallet */}
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <form className="flex w-full lg:ml-0" onSubmit={handleSearch}>
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Search by Collection Address"
                      type="search"
                      name="search"
                      onChange={(e) => (search.current = e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center lg:ml-6">
                {/* Wallet Dropdown */}
                <ConnectWallet />
              </div>
            </div>
          </div>
          {/* Content container*/}
          {router.pathname.startsWith("/app/home") ? (
            <main className="flex-1">
              <div className="py-6">{props.children}</div>
            </main>
          ) : (
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
              <div className="relative z-0 flex flex-1 overflow-hidden">
                <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
                  {/* Start main area*/}
                  {/* <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                  <div className="h-full rounded-lg border-2 border-dashed border-gray-200" />
                </div> */}
                  {props.children}
                  {/* End main area */}
                </main>

                <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-l border-gray-200 xl:flex xl:flex-col">
                  {/* Start secondary column (hidden on smaller screens) */}
                  <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                    {props.sideBarJSX}
                  </div>
                  {/* End secondary column */}
                </aside>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
