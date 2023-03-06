import { configureChains, createClient } from "wagmi";
import { goerli, mainnet, polygonMumbai } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// import {
//   GoogleSocialWalletConnector,
//   GithubSocialWalletConnector,
//   DiscordSocialWalletConnector,
//   TwitterSocialWalletConnector,
// } from "@zerodevapp/wagmi";
// import { getPrivateKeyOwner } from "@zerodevapp/sdk";
// import { ZeroDevConnector } from "@zerodevapp/wagmi";

import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    ...(process.env.NODE_ENV === "development" ? [polygonMumbai, goerli] : []),
  ],
  [publicProvider()]
);

const options = {
  options: { projectId: "b5486fa4-e3d9-450b-8428-646e757c10f6" },
};

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "UrNFTrader",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    // new ZeroDevConnector({
    //   chains,
    //   options: {
    //     projectId: "UrNFTrader",
    //   },
    // }),
    // new GoogleSocialWalletConnector(options),
    // new GithubSocialWalletConnector(options),
    // new GithubSocialWalletConnector({
    //   chains,
    //   options: {
    //     projectId: "UrNFTrader",
    //   },
    // }),
    // new DiscordSocialWalletConnector({
    //   chains,
    //   options: {
    //     projectId: "UrNFTrader",
    //   },
    // }),
    // new TwitterSocialWalletConnector({
    //   chains,
    //   options: {
    //     projectId: "UrNFTrader",
    //   },
    // }),
  ],
  provider,
  webSocketProvider,
});
