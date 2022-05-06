import React, { useEffect, useState, useCallback, useContext } from "react";
import { useQuery } from "urql";
import styled from "@emotion/styled";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import { getPoolInfo } from "../../graph";
import { fetchFundComposition, fetchUniqueInvestors } from "../../api";
import { computeValueManaged, computeReturns } from "../../utils";
import { AvatarContext, PoolAddressContext } from "../../context";

const Banner: React.FC = () => {
  const poolAddress = useContext(PoolAddressContext);
  const avatar = useContext(AvatarContext);

  const [manager, setManager] = useState<any>({});
  const [valueManaged, setValueManaged] = useState<string>("");
  const [uniqueInvestors, setUniqueInvestors] = useState<number>(0);
  const [returns, setReturns] = useState<number>(0);

  const [result] = useQuery({
    query: getPoolInfo(poolAddress),
  });

  const { data, fetching } = result;

  const getValueManaged = useCallback(async () => {
    const response = await fetchFundComposition(poolAddress);
    setValueManaged(computeValueManaged(response.data.fund.fundComposition));
  }, [poolAddress]);

  const getUniqueInvestors = useCallback(async () => {
    const response = await fetchUniqueInvestors(poolAddress);
    setUniqueInvestors(response.data.allInvestmentsByFund.length);
  }, [poolAddress]);

  useEffect(() => {
    getUniqueInvestors();
  }, [getUniqueInvestors]);

  useEffect(() => {
    if (fetching) return;

    setManager(data?.pools[0]);
    setReturns(
      parseFloat(computeReturns(data?.pools[0].tokenPrice).toFixed(2))
    );
  }, [fetching, manager, data?.pools, data]);

  useEffect(() => {
    getValueManaged();
  }, [getValueManaged]);

  return (
    <div className="p-10 grid grid-cols-2 gap-8">
      <div className="flex flex-row gap-6">
        {avatar ? (
          <img alt="avatar" className="h-40 w-40 rounded-full" src={avatar} />
        ) : (
          <Jazzicon diameter={100} seed={jsNumberForAddress(poolAddress)} />
        )}
        <div>
          <h2 className="text-white text-xl mt-6">
            Managed by{" "}
            <StyledAnchor
              href={`https://app.dhedge.org/user/${manager.manager}`}
              rel="noreferrer"
              target="_blank"
            >
              {manager.managerName}
            </StyledAnchor>
          </h2>
        </div>
      </div>
      <div>
        <div className="bg-black-dark grid grid-cols-3 p-10 rounded-2xl">
          <div className="px-5">
            <p className="text-grey text-xl">Returns</p>
            <p className="text-2xl font-semibold mt-1 text-green-500">
              {returns} %
            </p>
          </div>
          <div className="px-3">
            <p className="text-grey text-xl">Value Managed</p>
            <p className="text-2xl font-semibold mt-1 text-white">
              $ {valueManaged}
            </p>
          </div>
          <div className="px-3">
            <p className="text-grey text-xl">Unique Investors</p>
            <p className="text-2xl font-semibold mt-1 text-white">
              {uniqueInvestors}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

const StyledAnchor = styled.a`
  color: #00a0d0;
`;
