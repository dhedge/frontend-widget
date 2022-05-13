import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "@emotion/styled";
import { AiOutlineClose } from "react-icons/ai";
import { Contract, ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

import { ExitModalContext, PoolAddressContext } from "../../context";
import PoolLogicAbi from "../../contracts/PoolLogic.json";
import { fromDecimal } from "../../utils";

const ExitPoolModal: React.FC = () => {
  const { library, account } = useWeb3React();
  const [exitModalOpen, setExitModalOpen] = useContext(ExitModalContext);
  const poolAddress = useContext(PoolAddressContext);

  const [poolTokenName, setPoolTokenName] = useState<string>("");
  const [userPoolBalance, setUserPoolBalance] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

  const poolContract = useMemo(() => {
    return new Contract(poolAddress, PoolLogicAbi);
  }, [poolAddress]);

  const fetchUserPoolInformation = useCallback(async () => {
    if (library && account) {
      const tokenName = await poolContract
        .connect(library.getSigner(account))
        .symbol();
      const userBalance = await poolContract
        .connect(library.getSigner(account))
        .balanceOf(account);
      setPoolTokenName(tokenName);
      setUserPoolBalance(parseFloat(fromDecimal(userBalance, 18).toFixed(6)));
    }
  }, [account, library, poolContract]);

  const handleWithdraw = async () => {
    if (poolContract && withdrawAmount > 0.0 && library && account) {
      const tx = await poolContract
        .connect(library.getSigner(account))
        .withdraw(ethers.utils.parseUnits(withdrawAmount.toString(), 18));
      await tx.wait();
      setExitModalOpen(false);
    }
  };

  useEffect(() => {
    fetchUserPoolInformation();
  }, [fetchUserPoolInformation]);

  return (
    <Modal className={`${exitModalOpen ? null : "hidden"} flex`}>
      <div className="m-auto bg-black-medium p-10 rounded-2xl">
        <div className="float-right -m-8">
          <button onClick={() => setExitModalOpen(false)}>
            <AiOutlineClose className="h-10 w-10 text-grey" />
          </button>
        </div>
        <div className="flex justify-center">
          <span className="text-2xl text-white">Withdraw</span>
        </div>
        <div className="bg-black-dark px-16 pt-16 pb-2 m-10 mb-5 rounded-2xl">
          <div className="col-span-8">
            <span className="text-3xl text-white">
              Balance : {userPoolBalance}
            </span>
          </div>
          <div className="grid grid-cols-12 gap-5 py-2">
            <div className="bg-black-light px-3 py-5 rounded-3xl text-white text-2xl w-full grid col-span-4">
              {poolTokenName}
            </div>
            <input
              className="rounded-full bg-transparent border-2 border-grey h-full p-2 pl-4 text-2xl focus:text-grey text-grey grid col-span-8"
              onChange={(event) =>
                setWithdrawAmount(parseFloat(event.target.value))
              }
            />
          </div>
          <button
            className="text-white my-5 bg-gradient-to-r from-blue bg-blue-light hover:bg-blue text-shadow-blue font-semibold w-full px-6 py-2.5   transition-all rounded-full whitespace-nowrap tracking-wide text-base text-center overflow-ellipsis disabled:cursor-not-allowed disabled:opacity-50 select-none"
            disabled={withdrawAmount > userPoolBalance}
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExitPoolModal;

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
