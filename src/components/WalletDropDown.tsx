import { Fragment, useState } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { ConnectorData, Connector } from "wagmi";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { useRouter } from "next/router";

import { findWalletIcon } from "../utils";

const solutions = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];

export function WalletDropDown({ children }: { children: string }) {
  //   const { connectors, connector } = props;
  const { connector, isConnected, address } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  //   const items = connectors.map(() => {
  //     return {
  //         connectors,
  //         icon:
  //     }
  //   })

  return (
    <Popover className="relative">
      <Popover.Button>
        <span className="inline-block font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">
          {children}
        </span>
      </Popover.Button>

      <Popover.Overlay className="bg-slate-500 " />

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto  overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {connectors.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex  items-center align-middle gap-x-6 rounded-lg p-4 hover:bg-gray-50 hover:cursor-pointer"
                  onClick={() => {
                    connect({ connector: item });
                    close();
                  }}
                >
                  <a className="mt-1 flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    {findWalletIcon(item.name)}
                  </a>
                  <div className="items-center">
                    <span className="font-semibold text-gray-900 items-center">
                      {item.name}
                      <span className="absolute inset-0" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
