import "../styles/index.css";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { useRouter } from "next/router";

import { client } from "../wagmi";
// import { LandingPageLayout, MainAppLayout } from "./layouts"
import LandingPageLayout from "../layouts/LandingPageLayout";
import MainAppLayout from "../layouts/MainAppLayout";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  const page = React.useRef("");
  const router = useRouter();
  const curPage = router.pathname.split("/")[1];
  page.current = curPage;
  React.useEffect(() => {
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
