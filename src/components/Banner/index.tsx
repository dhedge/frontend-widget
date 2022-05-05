import React, { useEffect, useState, useCallback, useContext } from "react";
import { useQuery } from "urql";
import styled from "@emotion/styled";

import { getPoolInfo, getDeposits, getWithdrawals } from "../../graph";
import { fetchFundComposition } from "../../api";
import { computeValueManaged, computeUniqueInvestors } from "../../utils";
import { PoolAddressContext } from "../../context";

const Banner: React.FC = () => {
  const poolAddress = useContext(PoolAddressContext);
  console.log({ poolAddress });
  const [manager, setManager] = useState<any>({});
  const [valueManaged, setValueManaged] = useState<string>("");
  const [uniqueInvestors, setUniqueInvestors] = useState<number>(0);

  const [result] = useQuery({
    query: getPoolInfo(poolAddress),
  });

  const [depositsResult] = useQuery({
    query: getDeposits(poolAddress),
  });
  const [withdrawalsResult] = useQuery({
    query: getWithdrawals(poolAddress),
  });

  const { data, fetching } = result;
  const { data: depositsData, fetching: depositsFetching } = depositsResult;
  const { data: withdrawalsData, fetching: withdrawalsFetching } =
    withdrawalsResult;

  useEffect(() => {
    if (depositsFetching && withdrawalsFetching) return;
    setUniqueInvestors(
      computeUniqueInvestors(
        depositsData?.deposits,
        withdrawalsData?.withdrawals
      )
    );
  }, [depositsData, depositsFetching, withdrawalsData, withdrawalsFetching]);

  const getValueManaged = useCallback(async () => {
    const response = await fetchFundComposition(poolAddress);
    setValueManaged(computeValueManaged(response.data.fund.fundComposition));
  }, []);

  useEffect(() => {
    if (fetching) return;

    setManager(data?.pools[0]);
  }, [fetching, manager, data?.pools, data]);

  useEffect(() => {
    getValueManaged();
  }, [getValueManaged]);

  return (
    <div className="p-10 grid grid-cols-2 gap-8">
      <div className="flex flex-row gap-6">
        <img
          alt="avatar"
          className="h-40 w-40 rounded-full"
          src={"https://picsum.photos/200"}
        />
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
            <p className="text-2xl font-semibold mt-1 text-green-500">0.08%</p>
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
