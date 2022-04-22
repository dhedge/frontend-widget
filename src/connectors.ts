import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

import { AbstractConnector } from "@web3-react/abstract-connector";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [10],
});

export const walletconnectConnector = new WalletConnectConnector({
  supportedChainIds: [10],
});

export const resetWalletConnectConnector = (
  connector?: AbstractConnector
): void => {
  if (connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined;
  }
};
