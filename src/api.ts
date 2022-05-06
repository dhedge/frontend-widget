import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api-v2.dhedge.org/graphql",
});

export const fetchTokenPriceHistory = async (
  fundAddress: string,
  period: string
) => {
  const payload = `
    query{
        tokenPriceHistory(address:"${fundAddress}",period:"${period}"){
          history{
            timestamp
            adjustedTokenPrice
          }
        }
      }
    `;
  const { data } = await axiosClient.post("", { query: payload });
  return data;
};

export const fetchFundComposition = async (fundAddress: string) => {
  const payload = `
  query{
    fund(address:"${fundAddress}"){
      id
      fundComposition{
        id
        tokenName
        amount
        isDeposit
        precision
        rate
        tokenAddress
      }
      managerLogicAddress
      isPrivate
    }
  }
  `;
  const { data } = await axiosClient.post("", { query: payload });
  return data;
};

export const fetchTokenPrice = async (fundAddress: string) => {
  const payload = `query{
    fund(address:"${fundAddress}"){
      tokenPrice
    }
  }`;
  const { data } = await axiosClient.post("", { query: payload });
  return data;
};

export const fetchUniqueInvestors = async (fundAddress: string) => {
  const payload = `
  query{
    allInvestmentsByFund(fund:"${fundAddress}"){
      investorAddress
      investorBalance
    }
  }
  `;
  const { data } = await axiosClient.post("", { query: payload });
  return data;
};
