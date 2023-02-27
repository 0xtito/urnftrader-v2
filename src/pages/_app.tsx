import "../styles/index.css";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import { useEffect, useState } from "react";
import { WagmiConfig } from "wagmi";

import { client } from "../wagmi";
import { createClient } from "@reservoir0x/reservoir-sdk";

createClient({
  chains: [
    {
      id: 1,
      baseApiUrl: "https://api.reservoir.tools",
      default: true,
      apiKey: process.env.MAINNET_RESERVOIR_API_KEY,
    },
  ],
  source: "YOUR.SOURCE",
});

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <WagmiConfig client={client}>
      <NextHead>
        <title>UrNFTrader</title>
      </NextHead>

      {mounted && <Component {...pageProps} />}
    </WagmiConfig>
  );
}

export default App;
