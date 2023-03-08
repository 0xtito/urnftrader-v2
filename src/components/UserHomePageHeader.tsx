import { useState, Dispatch, SetStateAction } from "react";

interface ProfileTabsInterface {
  name: string;
  href: string;
  current: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface UserHomePageHeaderProps {
  address: string;
  tabs: ProfileTabsInterface[];
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
}

export function UserHomePageHeader(props: UserHomePageHeaderProps) {
  const { address, tabs, activeTab, setActiveTab } = props;

  return (
    <div className="border-b border-gray-200 pb-5 sm:pb-0">
      <h3 className="text-lg font-semibold leading-6 text-gray-900 flex place-content-center">
        Welcome {address}
      </h3>
      <div className="flex place-content-center mt-3 sm:mt-4 ">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={tabs.find((tab) => activeTab == tab.name)!.name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => {
                  console.log(tab.name);
                  tabs.forEach((tab) => (tab.current = false));
                  setActiveTab(tab.name);
                }}
                className={classNames(
                  activeTab == tab.name
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium hover:cursor-pointer"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
