import React, { useCallback, useState, useEffect } from "react";

import { fetchFundComposition } from "../../api";

const PoolInfo: React.FC = () => {
  const [depositAssets, setDepositAssets] = useState([]);

  const getFundComposition = useCallback(async () => {
    const response = await fetchFundComposition(
      "0x2fbd33f07d414be3e3e112916504b9bdc5617b69"
    );

    setDepositAssets(response.data.fund.fundComposition);
  }, []);

  useEffect(() => {
    getFundComposition();
  }, [getFundComposition]);

  return (
    <div className="p-10 bg-black-dark mt-10 rounded-2xl">
      <p className="text-white text-2xl font-semibold">Your Share</p>
      <div className="grid grid-cols-12">
        <div className="col-span-6 p-2">
          <div className="flex flex-col">
            <p className="text-grey text-lg font-normal">Your Balance</p>
            <p className="text-white text-2xl">$ 0</p>
          </div>
        </div>
        <div className="col-span-6 p-2">
          <div className="flex flex-col">
            <p className="text-grey text-lg font-normal">Profit / Loss</p>
            <p className="text-white text-2xl">-</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-grey text-lg">Assets to invest with</p>
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {depositAssets
          .filter((value: any, _) => value.isDeposit)
          .map((asset: any, idx) => (
            <span
              className="col-span-3 bg-blue rounded-xl inline-flex items-center justify-center flex-nowrap rounded-xl px-2.5 py-1"
              key={idx}
            >
              <p className=" text-white">{asset.tokenName}</p>
            </span>
          ))}
      </div>
    </div>
  );
};

export default PoolInfo;
