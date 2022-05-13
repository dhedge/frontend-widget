import { ethers, BigNumber } from "ethers";
import moment from "moment";

export const preparePerfomanceHistoryData = (performanceHistoryData: any) => {
  const performanceHistory: any[] = [];
  performanceHistoryData.map((history: any, idx: any) => {
    const performanceHistoryObject = {} as any;
    performanceHistoryObject.timestamp = moment(
      parseInt(history.timestamp)
    ).format("LLL");
    performanceHistoryObject.performance = parseFloat(
      (history.adjustedTokenPrice * 100).toFixed(2).toString()
    );
    performanceHistory.push(performanceHistoryObject);
  });
  return performanceHistory;
};

export const fromDecimal = (amount: number | BigNumber, precision: number) => {
  return parseFloat(ethers.utils.formatUnits(amount, precision));
};

export const computeValueManaged = (fundComposition: any) => {
  let valueManaged = 0;
  fundComposition.map((token: any, idx: any) => {
    if (parseFloat(token.amount) !== 0) {
      const tokenContribution =
        fromDecimal(BigNumber.from(token.amount), token.precision) *
        fromDecimal(BigNumber.from(token.rate), 18);
      valueManaged += tokenContribution;
    }
  });
  return valueManaged.toFixed(2).toString();
};

export const computeUniqueInvestors = (deposits: any, withdrawals: any) => {
  console.log(deposits, withdrawals);

  return 0;
};

export const computeConversion = (
  rateA: number,
  rateB: number,
  amountA: number,
  precision: number
) => {
  return (rateA * amountA) / rateB;
};

export const computeReturns = (tokenPrice: number) => {
  return ((fromDecimal(tokenPrice, 18) - 1.0) / 1) * 100;
};
