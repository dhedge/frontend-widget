import React, { useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "urql";
import { ethers } from "ethers";

import {
  PerformanceHistoryTabsContext,
  InvestModalContext,
  FundCompositionContext,
  PoolAddressContext,
  WalletInfoModalContext,
  AvatarContext,
  ExitModalContext,
} from "./context";
import { urqlClient } from "./graph";
import BaseLayout from "./components/BaseLayout";
import InvestModal from "./components/InvestModal";
import WalletInfoModal from "./components/WalletInfoModal";
import ExitPoolModal from "./components/ExitPoolModal";

type WidgetProps = {
  poolAddress: string;
  provider: any;
  avatar?: any;
  rpcUrl?: string;
};
const DHedgeWidget: React.FC<WidgetProps> = (props) => {
  const { poolAddress, avatar, provider, rpcUrl } = props;

  const [tabIndex, setTabIndex] = useState<string>("1m");
  const [investModalOpen, setInvestModalOpen] = useState<boolean>(false);
  const [exitModalOpen, setExitModalOpen] = useState<boolean>(false);
  const [depositAssets, setDepositAssets] = useState([]);
  const [walletInfoModalOpen, setWalletInfoModalOpen] =
    useState<boolean>(false);

  const web3Provider = () => {
    if (rpcUrl && provider) {
      return new ethers.providers.JsonRpcProvider(
        { url: rpcUrl },
        { chainId: 10, name: "optimism" }
      );
    } else {
      return provider;
    }
  };
  return (
    <>
      <Web3ReactProvider getLibrary={web3Provider}>
        <Provider value={urqlClient}>
          <PoolAddressContext.Provider value={poolAddress}>
            <AvatarContext.Provider value={avatar}>
              <PerformanceHistoryTabsContext.Provider
                value={[tabIndex, setTabIndex]}
              >
                <InvestModalContext.Provider
                  value={[investModalOpen, setInvestModalOpen]}
                >
                  <FundCompositionContext.Provider
                    value={[depositAssets, setDepositAssets]}
                  >
                    <WalletInfoModalContext.Provider
                      value={[walletInfoModalOpen, setWalletInfoModalOpen]}
                    >
                      <ExitModalContext.Provider
                        value={[exitModalOpen, setExitModalOpen]}
                      >
                        <BaseLayout />
                        <InvestModal />
                        <WalletInfoModal />
                        <ExitPoolModal />
                      </ExitModalContext.Provider>
                    </WalletInfoModalContext.Provider>
                  </FundCompositionContext.Provider>
                </InvestModalContext.Provider>
              </PerformanceHistoryTabsContext.Provider>
            </AvatarContext.Provider>
          </PoolAddressContext.Provider>
        </Provider>
      </Web3ReactProvider>
    </>
  );
};

export default DHedgeWidget;
