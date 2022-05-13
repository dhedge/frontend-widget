import React, { useContext } from "react";
import { useWeb3React } from "@web3-react/core";

import { WalletInfoModalContext } from "../../context";
import { useEagerConnect, useInactiveListener } from "../../hooks";

const Header: React.FC = () => {
  const [, setWalletInfoModalOpen] = useContext(WalletInfoModalContext);

  const { account } = useWeb3React();

  const address = account?.slice(0, 4) + "...." + account?.slice(38, 42);

  const openConnectModal = () => {
    if (account) {
      setWalletInfoModalOpen(true);
    }
  };
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);
  return (
    <div className="float-right p-10">
      <span
        className="bg-gradient-to-r from-blue bg-blue-light text-white text-shadow-blue font-semibold px-6 py-2 whitespace-nowrap rounded-full text-base tracking-wide"
        onClick={openConnectModal}
      >
        {account ? address : "Connect Wallet"}
      </span>
    </div>
  );
};

export default Header;
