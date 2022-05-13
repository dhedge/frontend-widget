import React, { useContext } from "react";
import styled from "@emotion/styled";
import { AiOutlineClose } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { useWeb3React } from "@web3-react/core";

import { WalletInfoModalContext } from "../../context";

const WalletInfoModal: React.FC = () => {
  const [walletInfoModalOpen, setWalletInfoModalOpen] = useContext(
    WalletInfoModalContext
  );
  const { account, deactivate } = useWeb3React();

  const handleDisconnect = () => {
    deactivate();
    setWalletInfoModalOpen(deactivate);
  };

  return (
    <InfoModal
      className={`${
        walletInfoModalOpen ? null : "hidden"
      } flex flex-row justify-center`}
    >
      <div className="bg-black-medium m-auto">
        <div className="float-right p-3">
          <button onClick={() => setWalletInfoModalOpen(false)}>
            <AiOutlineClose className="h-8 w-8 text-grey" />
          </button>
        </div>
        <div className="flex flex-row p-20">
          <span className="bg-black-dark rounded-full p-2">
            <p className="text-white p-2 text-3xl">{account}</p>
          </span>
          <button
            className="bg-transparent p-5 ml-1 bg-black-dark rounded-full"
            onClick={handleDisconnect}
          >
            <p className="text-blue text-xl flex flex-row">
              Disconnect <BiExit className="text-blue flex self-center mx-1" />
            </p>
          </button>
        </div>
      </div>
    </InfoModal>
  );
};

const InfoModal = styled.div`
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

export default WalletInfoModal;
