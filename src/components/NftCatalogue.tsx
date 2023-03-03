import Link from "next/link";
import { Collection } from "../interfaces";

interface NftCatalogueProps {
  data: Collection;
}

export function NftCatalogue(props: NftCatalogueProps) {
  const { data } = props;

  return (
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:mt-4">
      {data?.nfts.map((nft) => (
        <Link key={nft.name} href="#">
          <div
            key={nft.name}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white hover:cursor-pointer"
          >
            <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-64">
              <img
                src={nft.image}
                alt={nft.name}
                className="h-full w-full object-cover object-center sm:h-full sm:w-full transform hover:scale-110 transition duration-500 ease-in-out"
              />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
              <h3 className="text-sm font-medium text-gray-900">
                {/* <a href={nft.marketplace.assetPage}> */}
                <span aria-hidden="true" className="absolute" />
                {nft.name}
                {/* </a> */}
              </h3>
              {/* <p className="text-sm text-gray-500">{product.description}</p> */}
              <div className="flex flex-1 flex-col justify-end">
                <p className="text-sm italic text-gray-500">
                  {nft.description}
                </p>
                <div className="flex flex-row justify-between">
                  <div className="flex">
                    <img
                      className="h-5 w-5"
                      src="https://raw.githubusercontent.com/reservoirprotocol/marketplace-v2/main/public/icons/currency/eth.png"
                    ></img>
                    <span className="text-base font-medium text-gray-900">
                      {nft.price}
                    </span>
                  </div>
                  <div className="inline-flex ">
                    <img
                      src={nft.marketplace?.icon}
                      className="hover:cursor-pointer h-5 w-5 z-10"
                      onClick={() => window.open(nft.marketplace?.assetPage)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

{
  /* Spinner loader
          <div className="flex items-center justify-center">
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
          </div> */
}
