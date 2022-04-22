import React, { useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { ConnectModalContext } from "../../context";

const Header: React.FC = () => {
  const [_, setConnectModalOpen] = useContext(ConnectModalContext);

  const openConnectModal = () => {
    setConnectModalOpen(true);
  };
  const { account } = useWeb3React();
  return (
    <div className="mx-10 my-10">
      <div className="float-right">
        <button
          className="bg-gradient-to-r from-blue bg-blue-light text-white text-shadow-blue font-semibold px-6 py-2 whitespace-nowrap rounded-full text-base tracking-wide"
          onClick={openConnectModal}
        >
          {account ? "Connected" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Header;
