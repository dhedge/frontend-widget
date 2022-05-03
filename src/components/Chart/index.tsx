import React, { useEffect, useCallback, useState, useContext } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

import { fetchTokenPriceHistory } from "../../api";
import { preparePerfomanceHistoryData } from "../../utils";
import PerformanceHistoryTabs from "../PerformanceHistoryTabs";
import { PerformanceHistoryTabsContext } from "../../context";

const WidgetChart: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [tabIndex, _] = useContext(PerformanceHistoryTabsContext);
  const [loading, setLoading] = useState<boolean>(true);

  const getPerformanceData = useCallback(async () => {
    try {
      setLoading(true);
      const requestData = await fetchTokenPriceHistory(
        "0x3a52997c75f721f9da269f90e23be4a4fdb94910",
        `${tabIndex}`
      );
      setPerformanceData(
        preparePerfomanceHistoryData(requestData.data.tokenPriceHistory.history)
      );
      setLoading(false);
    } catch (e) {
      setLoading(true);
    }
  }, [tabIndex]);

  useEffect(() => {
    getPerformanceData();
  }, [getPerformanceData]);

  return (
    <div className="bg-black-dark rounded-2xl flex-col flex">
      <div>
        <PerformanceHistoryTabs />
      </div>
      <div className={`${loading ? `blur filter` : null}`}>
        <ResponsiveContainer className="mt-5" height={500}>
          <AreaChart data={performanceData} height={450}>
            <defs>
              <linearGradient id="colorUv" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#00a0d0" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00a0d0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip content={<WidgetTooltip />} />
            <Area
              className="cursor-pointer"
              dataKey="performance"
              fill="url(#colorUv)"
              fillOpacity={1}
              stroke="#00a0d0"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const WidgetTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black p-10 rounded-2xl border-white border-2">
        <p className="text-white text-lg">{payload[0].payload.timestamp}</p>
        <p className="text-blue text-lg">
          Performance : {payload[0].payload.performance}%
        </p>
      </div>
    );
  }
  return null;
};
export default WidgetChart;
