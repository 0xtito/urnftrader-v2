import { Fragment, useState } from "react";
import { BuySection, SellSection } from ".";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const publishingOptions = [
  {
    title: "Market",
    description: "Buy the cheapest NFT",
    current: true,
  },
  {
    title: "Limit",
    description: "Buy/Sell an NFT at a certain price",
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function OrderSection() {
  const [buyActive, setBuyActive] = useState(true);
  const [selected, setSelected] = useState(publishingOptions[0]);

  return (
    <Fragment>
      <div className="flex justify-between mb-2">
        <span className="isolate inline-flex rounded-md shadow-sm items-center">
          <button
            type="button"
            value="buy"
            className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            onClick={(e) => {
              setBuyActive(true);
            }}
          >
            Buy
          </button>
          <button
            type="button"
            value="sell"
            className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            onClick={() => {
              setBuyActive(false);
            }}
          >
            Sell
          </button>
        </span>
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <Listbox.Label className="sr-only">
                Change published status
              </Listbox.Label>
              <div className="relative">
                <div className="inline-flex divide-x divide-gray-500 rounded-md shadow-sm">
                  <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-gray-400 py-2 px-3 text-white shadow-sm">
                    <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    <p className="text-sm font-semibold">{selected.title}</p>
                  </div>
                  <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-gray-400 p-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-gray-50">
                    <span className="sr-only">Change published status</span>
                    <ChevronDownIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </Listbox.Button>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {publishingOptions.map((option) => (
                      <Listbox.Option
                        key={option.title}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "cursor-default select-none p-4 text-sm"
                          )
                        }
                        value={option}
                      >
                        {({ selected, active }) => (
                          <div className="flex flex-col">
                            <div className="flex justify-between">
                              <p
                                className={
                                  selected ? "font-semibold" : "font-normal"
                                }
                              >
                                {option.title}
                              </p>
                              {selected ? (
                                <span
                                  className={
                                    active ? "text-white" : "text-indigo-600"
                                  }
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </div>
                            <p
                              className={classNames(
                                active ? "text-indigo-200" : "text-gray-500",
                                "mt-2"
                              )}
                            >
                              {option.description}
                            </p>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <div className="relative py-4">
        <div
          className="absolute inset-0 flex items-center place-content-around"
          aria-hidden="true"
        >
          <div className="w-3/4 border-t border-gray-300 " />
        </div>
      </div>
      <div className="rounded-lg border-gray-400 border-2 border-opacity-25 divide-x-4 divide-y-4">
        {buyActive ? <BuySection /> : <SellSection />}
      </div>
    </Fragment>
  );
}
