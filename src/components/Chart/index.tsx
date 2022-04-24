import React, { useEffect, useCallback, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

import { fetchTokenPriceHistory } from "../../api";
import { preparePerfomanceHistoryData } from "../../utils";

const WidgetChart: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<any[]>([]);

  const getPerformanceData = useCallback(async () => {
    const requestData = await fetchTokenPriceHistory(
      "0x600971E265947678088D18891c02813a1DbaA3e2",
      "3m"
    );
    setPerformanceData(
      preparePerfomanceHistoryData(requestData.data.tokenPriceHistory.history)
    );
  }, []);

  useEffect(() => {
    getPerformanceData();
  }, [getPerformanceData]);

  return (
    <div className="bg-black-dark my-20">
      <ResponsiveContainer className="w-1/2" height={300}>
        <AreaChart data={performanceData} height={250}>
          <defs>
            <linearGradient id="colorUv" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#00a0d0" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00a0d0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip content={<WidgetTooltip />} />
          <Area
            dataKey="performance"
            fill="url(#colorUv)"
            fillOpacity={1}
            stroke="#00a0d0"
          />
        </AreaChart>
      </ResponsiveContainer>
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
