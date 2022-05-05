import React, { useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { Provider } from "urql";

import "./App.css";
import {
  ConnectModalContext,
  PerformanceHistoryTabsContext,
  InvestModalContext,
  FundCompositionContext,
  PoolAddressContext,
} from "./context";
import WalletConnectionModal from "./components/WalletConnectionModal";
import { urqlClient } from "./graph";
import BaseLayout from "./components/BaseLayout";
import InvestModal from "./components/InvestModal";

type WidgetProps = {
  poolAddress: string;
  avatar?: any;
};
const DHedgeWidget: React.FC<WidgetProps> = (props) => {
  const { poolAddress, avatar } = props;

  const getLibrary = (provider: any): ethers.providers.Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };

  const [connectModalOpen, setConnectModalOpen] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<string>("1m");
  const [investModalOpen, setInvestModalOpen] = useState<boolean>(false);
  const [depositAssets, setDepositAssets] = useState([]);

  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider value={urqlClient}>
          <PoolAddressContext.Provider value={poolAddress}>
            <ConnectModalContext.Provider
              value={[connectModalOpen, setConnectModalOpen]}
            >
              <PerformanceHistoryTabsContext.Provider
                value={[tabIndex, setTabIndex]}
              >
                <InvestModalContext.Provider
                  value={[investModalOpen, setInvestModalOpen]}
                >
                  <FundCompositionContext.Provider
                    value={[depositAssets, setDepositAssets]}
                  >
                    <BaseLayout />
                    <WalletConnectionModal />
                    <InvestModal />
                  </FundCompositionContext.Provider>
                </InvestModalContext.Provider>
              </PerformanceHistoryTabsContext.Provider>
            </ConnectModalContext.Provider>
          </PoolAddressContext.Provider>
        </Provider>
      </Web3ReactProvider>
    </>
  );
};

export default DHedgeWidget;
