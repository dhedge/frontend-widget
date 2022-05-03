import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { Contract } from "ethers";
import { useWeb3React } from "@web3-react/core";

import { fetchFundComposition } from "../../api";
import PoolLogicAbi from "../../contracts/PoolLogic.json";
import { fromDecimal } from "../../utils";
import { FundCompositionContext, InvestModalContext } from "../../context";

const PoolInfo: React.FC = () => {
  const [depositAssets, setDepositAssets] = useContext(FundCompositionContext);
  const [userBalance, setUserBalance] = useState<number>(0);

  const [_, setInvestModalOpen] = useContext(InvestModalContext);

  const { account, library } = useWeb3React();

  const getFundComposition = useCallback(async () => {
    const response = await fetchFundComposition(
      "0x3a52997c75f721f9da269f90e23be4a4fdb94910"
    );

    setDepositAssets(response.data.fund.fundComposition);
  }, [setDepositAssets]);

  useEffect(() => {
    getFundComposition();
  }, [getFundComposition]);

  const contract = useMemo(() => {
    return new Contract(
      "0x3a52997c75f721f9da269f90e23be4a4fdb94910",
      PoolLogicAbi
    );
  }, []);

  const fetchUserBalance = useCallback(async () => {
    if (library && account) {
      const balance = await contract
        .connect(library.getSigner())
        .balanceOf(account);
      setUserBalance(parseFloat(fromDecimal(balance, 18).toFixed(1)));
    }
  }, [account, contract, library]);

  useEffect(() => {
    fetchUserBalance();
  }, [fetchUserBalance]);

  return (
    <div className="p-10 bg-black-dark rounded-2xl h-full">
      <p className="text-white text-2xl font-semibold">Your Share</p>
      <div className="grid grid-cols-12">
        <div className="col-span-6 p-2">
          <div className="flex flex-col">
            <p className="text-grey text-2xl font-normal">Your Balance</p>
            <p className="text-white text-2xl">$ {userBalance}</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-grey text-2xl my-2">Assets to invest with</p>
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {depositAssets
          .filter((value: any, _: any) => value.isDeposit)
          .map((asset: any, idx: any) => (
            <span
              className="col-span-3 bg-blue rounded-xl inline-flex items-center justify-center flex-nowrap rounded-xl px-2.5 py-1"
              key={idx}
            >
              <p className="text-white text-lg">{asset.tokenName}</p>
            </span>
          ))}
      </div>
      <div className="my-10">
        <button
          className="text-white bg-gradient-to-r from-blue bg-blue-light hover:bg-blue text-shadow-blue font-semibold w-full px-6 py-2.5  animate-background transition-all rounded-full whitespace-nowrap tracking-wide text-base text-center overflow-ellipsis disabled:cursor-not-allowed disabled:opacity-50 select-none"
          onClick={() => setInvestModalOpen(true)}
        >
          Invest
        </button>
      </div>
    </div>
  );
};

export default PoolInfo;
