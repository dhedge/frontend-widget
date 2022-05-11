import React, {
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import styled from "@emotion/styled";
import { AiOutlineClose, AiOutlineArrowDown } from "react-icons/ai";
import { BigNumber, Contract, ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

import {
  InvestModalContext,
  FundCompositionContext,
  PoolAddressContext,
} from "../../context";
import ERC20Abi from "../../contracts/ERC20.json";
import PoolLogicAbi from "../../contracts/PoolLogic.json";
import { computeConversion, fromDecimal } from "../../utils";
import { fetchTokenPrice } from "../../api";

const InvestModal: React.FC = () => {
  const [investModalOpen, setInvestModalOpen] = useContext(InvestModalContext);
  const [depositAssets] = useContext(FundCompositionContext);
  const poolAddress = useContext(PoolAddressContext);

  const [selectedToken, setSelectedToken] = useState<string>("");
  const [selectedTokenAddress, setSelectedTokenAddress] = useState<string>("");
  const [userTokenBalance, setUserTokenBalance] = useState<number>(0);
  const [selectedTokenPrecision, setSelectedTokenPrecision] =
    useState<number>(0);
  const [poolTokenName, setPoolTokenName] = useState<string>("");
  const [userPoolBalance, setUserPoolBalance] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number>(0.0);
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [poolTokens, setPoolTokens] = useState<number>(0);
  const [tokenDecimals, setTokenDecimals] = useState<number>(0);
  const [allowance, setAllowance] = useState<boolean>(false);

  const { account, library } = useWeb3React();

  useEffect(() => {
    if (depositAssets.length > 0) {
      setSelectedToken(depositAssets[0].tokenName);
    }
  }, [depositAssets]);

  useEffect(() => {
    if (selectedToken.length > 0 && depositAssets.length > 0) {
      const assetIndex = depositAssets.findIndex(
        (asset: any) => asset.tokenName === selectedToken
      );
      setSelectedTokenAddress(depositAssets[assetIndex].tokenAddress);
      setSelectedTokenPrecision(depositAssets[assetIndex].precision);
    }
  }, [selectedToken, depositAssets]);

  const poolContract = useMemo(() => {
    return new Contract(poolAddress, PoolLogicAbi);
  }, [poolAddress]);

  const fetchPoolTokenDetails = useCallback(async () => {
    if (account && library) {
      const tokenName = await poolContract
        .connect(library.getSigner())
        .symbol();
      const userBalance = await poolContract
        .connect(library.getSigner())
        .balanceOf(account);
      const decimals = await poolContract
        .connect(library.getSigner())
        .decimals();
      setTokenDecimals(decimals);
      setPoolTokenName(tokenName);
      setUserPoolBalance(parseFloat(fromDecimal(userBalance, 18).toFixed(6)));
    }
  }, [account, library, poolContract]);

  const fetchPoolTokenPrice = useCallback(async () => {
    const response = await fetchTokenPrice(poolAddress);
    setTokenPrice(fromDecimal(response.data.fund.tokenPrice, 18));
  }, [poolAddress]);

  useEffect(() => {
    fetchPoolTokenPrice();
  }, [fetchPoolTokenPrice]);

  useEffect(() => {
    fetchPoolTokenDetails();
  }, [fetchPoolTokenDetails]);

  const handleDepositAmount = (event: any) => {
    if (event.target.value > 0) {
      setDepositAmount(event.target.value);
      const index = depositAssets.findIndex((asset: any) => {
        return asset.tokenName === selectedToken;
      });

      const rate = fromDecimal(BigNumber.from(depositAssets[index].rate), 18);

      setPoolTokens(
        computeConversion(
          rate,
          tokenPrice,
          parseFloat(event.target.value),
          tokenDecimals
        )
      );
    }
  };

  const tokenContract = useMemo(() => {
    if (selectedTokenAddress.length > 0) {
      return new Contract(selectedTokenAddress, ERC20Abi);
    }
  }, [selectedTokenAddress]);

  const fetchUserTokenBalanceAndAllowance = useCallback(async () => {
    if (account && library && tokenContract) {
      const tokenBalance = await tokenContract
        .connect(library.getSigner())
        .balanceOf(account);
      const userAllowance = await tokenContract
        .connect(library.getSigner())
        .allowance(account, poolAddress);
      setUserTokenBalance(
        parseFloat(fromDecimal(tokenBalance, selectedTokenPrecision).toFixed(6))
      );
      setAllowance(
        depositAmount < fromDecimal(userAllowance, selectedTokenPrecision)
      );
    }
  }, [
    account,
    depositAmount,
    library,
    poolAddress,
    selectedTokenPrecision,
    tokenContract,
  ]);

  const handleApprove = async () => {
    if (tokenContract) {
      const maxAmount =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      const tx = await tokenContract
        .connect(library.getSigner())
        .approve(poolAddress, maxAmount);
      await tx.wait();
      fetchUserTokenBalanceAndAllowance();
    }
  };
  const handleDeposit = async () => {
    if (
      poolContract &&
      depositAmount > 0.0 &&
      selectedTokenAddress &&
      selectedToken
    ) {
      const assetIndex = depositAssets.findIndex(
        (asset: any) => asset.tokenName === selectedToken
      );
      const tx = await poolContract
        .connect(library.getSigner())
        .deposit(
          selectedTokenAddress,
          ethers.utils.parseUnits(
            depositAmount.toString(),
            depositAssets[assetIndex].precision
          )
        );
      await tx.wait();
      setInvestModalOpen(false);
    }
  };
  useEffect(() => {
    fetchUserTokenBalanceAndAllowance();
  }, [fetchUserTokenBalanceAndAllowance]);

  return (
    <Modal className={`${investModalOpen ? null : "hidden"} flex`}>
      <div className="m-auto bg-black-medium p-10 rounded-2xl">
        <div className="float-right -m-8">
          <button onClick={() => setInvestModalOpen(false)}>
            <AiOutlineClose className="h-10 w-10 text-grey" />
          </button>
        </div>
        <div className="flex justify-center">
          <span className="text-2xl text-white">Invest</span>
        </div>
        <div className="bg-black-dark px-16 pt-16 pb-2 m-10 mb-5 rounded-2xl">
          <div>
            <span className="text-3xl text-white">
              Balance : {userTokenBalance}
            </span>
          </div>
          <div className="py-10 flex flex-row">
            <select
              className="bg-black-light px-3 py-5 rounded-full text-white text-2xl w-full"
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
            <div className="flex-grow mx-2">
              <input
                className="rounded-full bg-transparent border-2 border-grey h-full p-2 pl-4 text-2xl focus:text-grey text-grey"
                type="decimal"
                value={depositAmount}
                onChange={handleDepositAmount}
              />
            </div>
          </div>
        </div>
        <div className="justify-center flex">
          <span className="text-white rounded-full bg-black-dark p-5">
            <AiOutlineArrowDown className="h-6 w-6" />
          </span>
        </div>
        <div className="bg-black-dark px-16 pt-16 pb-2 m-10 mt-5 rounded-2xl">
          <div>
            <span className="text-3xl text-white">
              Balance : {userPoolBalance}
            </span>
          </div>
          <div className="py-10 flex flex-row">
            <div className="bg-black-light px-3 py-5 rounded-full text-white text-2xl w-full flex justify-center">
              <span>{poolTokenName}</span>
            </div>
            <div className="flex-grow mx-2">
              <input
                readOnly
                className="rounded-full bg-transparent border-2 border-grey h-full p-2 pl-4 text-2xl focus:text-grey text-grey"
                placeholder="0.0"
                type="decimal"
                value={poolTokens}
              />
            </div>
          </div>
        </div>
        <div className="py-5 grid grid-cols-12 gap-2">
          <button
            className={`${
              allowance
                ? "hidden"
                : "col-span-6 text-white bg-gradient-to-r from-blue bg-blue-light hover:bg-blue text-shadow-blue font-semibold w-full px-6 py-2.5   transition-all rounded-full whitespace-nowrap tracking-wide text-base text-center overflow-ellipsis disabled:cursor-not-allowed disabled:opacity-50 select-none"
            }`}
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            className={`col-span-${
              allowance ? "12" : "6"
            } text-white bg-gradient-to-r from-blue bg-blue-light hover:bg-blue text-shadow-blue font-semibold w-full px-6 py-2.5   transition-all rounded-full whitespace-nowrap tracking-wide text-base text-center overflow-ellipsis disabled:cursor-not-allowed disabled:opacity-50 select-none`}
            disabled={!allowance}
            onClick={handleDeposit}
          >
            Invest
          </button>
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
