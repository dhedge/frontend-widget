import React, {
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import styled from "@emotion/styled";
import { AiOutlineClose } from "react-icons/ai";
import { Contract } from "ethers";
import { useWeb3React } from "@web3-react/core";

import { InvestModalContext, FundCompositionContext } from "../../context";
import ERC20Abi from "../../contracts/ERC20.json";
import { fromDecimal } from "../../utils";

const InvestModal: React.FC = () => {
  const [investModalOpen, setInvestModalOpen] = useContext(InvestModalContext);
  const [depositAssets, _] = useContext(FundCompositionContext);

  const [selectedToken, setSelectedToken] = useState<string>("");
  const [selectedTokenAddress, setSelectedTokenAddress] = useState<string>("");
  const [userTokenBalance, setUserTokenBalance] = useState<number>(0);
  const [selectedTokenPrecision, setSelectedTokenPrecision] =
    useState<number>(0);

  const { account, library } = useWeb3React();

  useEffect(() => {
    if (selectedToken.length > 0 && depositAssets.length > 0) {
      const assetIndex = depositAssets.findIndex(
        (asset: any) => asset.tokenName === selectedToken
      );
      setSelectedTokenAddress(depositAssets[assetIndex].tokenAddress);
      setSelectedTokenPrecision(depositAssets[assetIndex].precision);
    }
  }, [selectedToken, depositAssets]);

  const tokenContract = useMemo(() => {
    if (selectedTokenAddress.length > 0) {
      return new Contract(selectedTokenAddress, ERC20Abi);
    }
  }, [selectedTokenAddress]);

  const fetchUserTokenBalance = useCallback(async () => {
    if (account && library && tokenContract) {
      const tokenBalance = await tokenContract
        .connect(library.getSigner())
        .balanceOf(account);
      setUserTokenBalance(
        parseFloat(fromDecimal(tokenBalance, selectedTokenPrecision).toFixed(6))
      );
    }
  }, [account, library, selectedTokenPrecision, tokenContract]);

  useEffect(() => {
    fetchUserTokenBalance();
  }, [fetchUserTokenBalance]);

  return (
    <Modal className={`${investModalOpen ? null : "hidden"} flex flex-row`}>
      <div className="m-auto bg-black-medium">
        <div className="float-right">
          <button onClick={() => setInvestModalOpen(false)}>
            <AiOutlineClose className="h-10 w-10 text-grey" />
          </button>
        </div>
        <div className="bg-black-dark p-10 m-10 rounded-2xl">
          <div>
            <span className="text-3xl text-white">
              Balance : {userTokenBalance}
            </span>
          </div>
          <div className="py-10">
            <select
              className="bg-black-light px-2 py-5 rounded-2xl text-white text-2xl w-full"
              value={selectedToken}
              onChange={(event) => {
                setSelectedToken(event.target.value);
              }}
            >
              {depositAssets.map((asset: any, idx: any) => {
                return (
                  <CustomOption
                    className="text-white bg-black-medium"
                    key={idx}
                    value={asset.tokenName}
                  >
                    {asset.tokenName}
                  </CustomOption>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InvestModal;

const Modal = styled.div`
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

const CustomOption = styled.option`
  background-color: red;
`;
