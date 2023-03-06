import "../styles/global.css";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import { useEffect, useState } from "react";
import { WagmiConfig } from "wagmi";

import { client } from "../wagmi";

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
