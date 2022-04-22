import React, { useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

import Header from "./components/Header";
import "./App.css";
import { ConnectModalContext } from "./context";
import WalletConnectionModal from "./components/WalletConnectionModal";

const App: React.FC = () => {
  const getLibrary = (provider: any): ethers.providers.Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  };
  const [connectModalOpen, setConnectModalOpen] = useState<boolean>(false);

  return (
    <div>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ConnectModalContext.Provider
          value={[connectModalOpen, setConnectModalOpen]}
        >
          <div className="App">
            <Header />
            <WalletConnectionModal />
          </div>
        </ConnectModalContext.Provider>
      </Web3ReactProvider>
    </div>
  );
};

export default App;
