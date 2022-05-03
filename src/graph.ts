import { createClient } from "urql";

export const urqlClient = createClient({
  url: "https://api.thegraph.com/subgraphs/name/dhedge/dhedge-v2-optimism",
});

export const getPoolInfo = (fundAddress: string | undefined | null) => {
  const query = `
  query{
    pools(where:{fundAddress:"${fundAddress}"}) {
      manager
      managerName
    }
    }
  `;
  return query;
};

export const getDeposits = (fundAddress: string | undefined | null) => {
  const query = `
  query{
    deposits(where:{fundAddress:"${fundAddress}"}){
      uniqueInvestor{
        id
      }
    }
  }
  `;
  return query;
};

export const getWithdrawals = (fundAddress: string | undefined | null) => {
  const query = `query{
    withdrawals(where:{fundAddress:"${fundAddress}"}){
      uniqueInvestor{
        id
      }
    }
  }`;
  return query;
};
