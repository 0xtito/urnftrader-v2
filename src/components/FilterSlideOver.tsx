import { Fragment, useContext, useState } from "react";
import { Dialog, Transition, Disclosure, Menu } from "@headlessui/react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { FilterStatus } from "../contexts/FilterStatus";

import { Collection, FilterStateProps, TraitInfo } from "../interfaces";
import { getOrganizedTraits } from "../utils";

export function FilterSlideOver(props: FilterStateProps) {
  const {
    collection,
    openSlideOver,
    handleFilterChange,
    handleSlideOverChange,
  } = props;

  const traits = useContext(FilterStatus);

  const { name, nfts } = collection;

  return (
    <Transition.Root show={openSlideOver} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => handleSlideOverChange()}
      >
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          {name}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none hover:focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => handleSlideOverChange()}
                          >
                            <span className="sr-only">Close panel</span>
                            <CheckIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <form className="block">
                        {Object.entries(traits).map(([traitType, _traits]) => (
                          <Disclosure
                            as="div"
                            key={traitType}
                            className="border-b border-gray-200 py-6"
                          >
                            {({ open }) => (
                              <Fragment>
                                <h3 className="-my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {traitType}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-4">
                                    {Object.entries(_traits).map(
                                      ([name, { count, checked }], i) => (
                                        <div
                                          key={name}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-${traitType}-${name}`}
                                            name={`${traitType}[]`}
                                            defaultValue={`${traitType}-${name}`}
                                            type="checkbox"
                                            defaultChecked={checked}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            onClick={(e) => {
                                              const updatedTrait: TraitInfo = {
                                                name: e.currentTarget.value,
                                                checked:
                                                  e.currentTarget.checked,
                                              };
                                              handleFilterChange(
                                                traits,
                                                updatedTrait
                                              );
                                            }}
                                          />
                                          <label
                                            htmlFor={`filter-${traitType}-${i}`}
                                            className="ml-3 text-sm text-gray-600 items-center"
                                          >
                                            {name}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Disclosure.Panel>
                              </Fragment>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
