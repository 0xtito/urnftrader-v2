import { configureChains, createClient } from "wagmi";
import { goerli, mainnet, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import {
  FacebookSocialWalletConnector,
  GoogleSocialWalletConnector,
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitterSocialWalletConnector,
  enhanceConnectorWithAA,
} from "@zerodevapp/wagmi";

// testing
const useMainnet = true;

import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, ...(process.env.NODE_ENV === "development" ? [polygonMumbai] : [])],
  [
    publicProvider(),
    alchemyProvider({
      apiKey: useMainnet
        ? process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_MAINNET!
        : process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_MUMBAI!,
    }),
  ]
);

const options = {
  options: {
    projectId: useMainnet
      ? process.env.NEXT_PUBLIC_ZERODEV_KEY_MAINNET!
      : process.env.NEXT_PUBLIC_ZERODEV_KEY_MUMBAI!,
  },
  chains,
};

export const client = createClient({
  autoConnect: true,
  connectors: [
    enhanceConnectorWithAA(new MetaMaskConnector({ chains }), options.options),
    enhanceConnectorWithAA(
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: "UrNFTrader",
        },
      }),
      options.options
    ),
    enhanceConnectorWithAA(
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      options.options
    ),
    new GoogleSocialWalletConnector(options),
    new GithubSocialWalletConnector(options),
    new DiscordSocialWalletConnector(options),
    new TwitterSocialWalletConnector(options),
    new FacebookSocialWalletConnector(options),
  ],
  provider,
  webSocketProvider,
});
