import { ethers } from "ethers";
import moment from "moment";

export const preparePerfomanceHistoryData = (performanceHistoryData: any) => {
  const performanceHistory: any[] = [];
  performanceHistoryData.map((history: any, idx: any) => {
    const performanceHistoryObject = {} as any;
    performanceHistoryObject.timestamp = moment(
      parseInt(history.timestamp)
    ).format("LLL");
    performanceHistoryObject.performance = (
      history.adjustedTokenPrice * 100
    ).toFixed(2);
    performanceHistory.push(performanceHistoryObject);
  });
  return performanceHistory;
};

export const fromDecimal = (amount: number) => {
  return ethers.utils.parseUnits(amount.toString(), 18).toNumber();
};
