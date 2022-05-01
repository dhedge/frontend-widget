import React, { useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { Provider } from "urql";

import "./App.css";
import { ConnectModalContext, PerformanceHistoryTabsContext } from "./context";
import WalletConnectionModal from "./components/WalletConnectionModal";
import { urqlClient } from "./graph";
import BaseLayout from "./components/BaseLayout";
import Header from "./components/Header";

const App: React.FC = () => {
  const getLibrary = (provider: any): ethers.providers.Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };
  const [connectModalOpen, setConnectModalOpen] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<string>("1m");
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider value={urqlClient}>
          <ConnectModalContext.Provider
            value={[connectModalOpen, setConnectModalOpen]}
          >
            <PerformanceHistoryTabsContext.Provider
              value={[tabIndex, setTabIndex]}
            >
              <Header />
              <BaseLayout />
              <WalletConnectionModal />
            </PerformanceHistoryTabsContext.Provider>
          </ConnectModalContext.Provider>
        </Provider>
      </Web3ReactProvider>
    </>
  );
};

export default App;
