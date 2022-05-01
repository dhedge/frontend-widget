import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import { getPoolInfo } from "../../graph";

const Banner: React.FC = () => {
  const [manager, setManager] = useState<any>({});

  const [result] = useQuery({
    query: getPoolInfo("0x2fbD33F07d414bE3e3e112916504b9bdc5617b69"),
  });
  const { data, fetching } = result;

  useEffect(() => {
    if (fetching) return;

    setManager(data?.pools[0]);
  }, [fetching, manager, data?.pools, data]);

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
            <p className="text-2xl font-semibold mt-1 text-white">$</p>
          </div>
          <div className="px-3">
            <p className="text-grey text-xl">Unique Investors</p>
            <p className="text-2xl font-semibold mt-1 text-white">17</p>
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
