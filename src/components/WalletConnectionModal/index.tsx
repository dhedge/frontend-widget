import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { AiOutlineClose } from "react-icons/ai";
import { useEagerConnect, useInactiveListener } from "../../hooks";
import { useWeb3React } from "@web3-react/core";

import metamask from "./metamask.svg";
import WalletConnectCircleWhite from "./walletconnect-circle-white.svg";
import { ConnectModalContext } from "../../context";
import {
  injectedConnector,
  walletconnectConnector,
  resetWalletConnectConnector,
} from "../../connectors";

const WalletConnectionModal: React.FC = () => {
  const { connector, active, activate, error } = useWeb3React();

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  const [connectModalOpen, setConnectModalOpen] =
    useContext(ConnectModalContext);
  const closeModal = () => {
    setConnectModalOpen(false);
  };
  useEffect(() => {
    if (error) {
      resetWalletConnectConnector(connector);
    }
  }, [connector, error]);

  useEffect(() => {
    if (active) {
      setConnectModalOpen(false);
    }
  }, [active, connectModalOpen, setConnectModalOpen]);

  return (
    <ConnectModal
      className={`${
        connectModalOpen ? null : "hidden"
      } flex flex-row justify-center`}
    >
      <div className="m-auto bg-black-medium">
        <div className="float-right p-5">
          <button onClick={closeModal}>
            <StyledClose className="h-10 w-10" />
          </button>
        </div>
        <div className="flex flex-row p-20">
          <div
            className="hover:bg-black cursor-pointer rounded-3xl p-2"
            onClick={() => activate(injectedConnector)}
          >
            <img
              alt="metamask-logo"
              className="h-32 w-32 mx-10 mb-2"
              src={metamask}
            />
            <div className="text-white font-semibold text-center p-2">
              MetaMask
            </div>
          </div>
          <div
            className="hover:bg-black cursor-pointer rounded-3xl p-2"
            onClick={() => activate(walletconnectConnector)}
          >
            <img
              alt="wallet-connect-logo"
              className="h-32 w-32 mx-10 mb-2"
              src={WalletConnectCircleWhite}
            />
            <div className="text-white font-semibold text-center p-2">
              WalletConnect
            </div>
          </div>
        </div>
      </div>
    </ConnectModal>
  );
};

const ConnectModal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const StyledClose = styled(AiOutlineClose)`
  color: grey;
`;

export default WalletConnectionModal;
