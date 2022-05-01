import React, { useContext } from "react";

import { PerformanceHistoryTabsContext } from "../../context";

const PerformanceHistoryTabs: React.FC = () => {
  const [tabIndex, setTabIndex] = useContext(PerformanceHistoryTabsContext);

  const switchTab = (event: any) => {
    switch (event.target.innerText.toLowerCase()) {
      case "1d":
        setTabIndex("1d");
        break;
      case "1w":
        setTabIndex("1w");
        break;
      case "1m":
        setTabIndex("1m");
        break;
      case "3m":
        setTabIndex("3m");
        break;
      case "6m":
        setTabIndex("6m");
        break;
      case "1y":
        setTabIndex("1y");
        break;
      case "all":
        setTabIndex("all");
        break;
      default:
        break;
    }
  };

  return (
    <div className="float-right">
      <div className="flex rounded-full gap-7 m-5">
        <button
          className="centering-container text-sm rounded focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black-dark focus:ring-blue-medium focus:z-10 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={switchTab}
        >
          <span
            className={
              tabIndex === "1d"
                ? `text-white border-b border-white border-solid`
                : `text-grey hover:text-white`
            }
          >
            <span className="font-semibold text-2xl">1D</span>
          </span>
        </button>
        <button
          className="centering-container text-sm rounded focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black-dark focus:ring-blue-medium focus:z-10 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={switchTab}
        >
          <span
            className={
              tabIndex === "1w"
                ? `text-white border-b border-white border-solid`
                : `text-grey hover:text-white`
            }
          >
            <span className="font-semibold text-2xl">1W</span>
          </span>
        </button>
        <button
          className="centering-container text-sm rounded focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black-dark focus:ring-blue-medium focus:z-10 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={switchTab}
        >
          <span
            className={
              tabIndex === "1m"
                ? `text-white border-b border-white border-solid`
                : `text-grey hover:text-white`
            }
          >
            <span className="font-semibold text-2xl">1M</span>
          </span>
        </button>
        <button
          className="centering-container text-sm rounded focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black-dark focus:ring-blue-medium focus:z-10 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={switchTab}
        >
          <span
            className={
              tabIndex === "3m"
                ? `text-white border-b border-white border-solid`
                : `text-grey hover:text-white`
            }
          >
            <span className="font-semibold text-2xl">3M</span>
          </span>
        </button>
        <button
          className="centering-container text-sm rounded focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black-dark focus:ring-blue-medium focus:z-10 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={switchTab}
        >
          <span
            className={
              tabIndex === "6m"
                ? `text-white border-b border-white border-solid`
                : `text-grey hover:text-white`
            }
          >
            <span className="font-semibold text-2xl">6M</span>
          </span>
        </button>
        <button
          className="centering-container text-sm rounded focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black-dark focus:ring-blue-medium focus:z-10 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={switchTab}
        >
          <span
            className={
              tabIndex === "1y"
                ? `text-white border-b border-white border-solid`
                : `text-grey hover:text-white`
            }
          >
            <span className="font-semibold text-2xl">1Y</span>
          </span>
        </button>
        <button
          className="centering-container text-sm rounded focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black-dark focus:ring-blue-medium focus:z-10 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={switchTab}
        >
          <span
            className={
              tabIndex === "all"
                ? `text-white border-b border-white border-solid`
                : `text-grey hover:text-white`
            }
          >
            <span className="font-semibold text-2xl">All</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default PerformanceHistoryTabs;
