import React from "react";

import Banner from "../Banner";
import WidgetChart from "../Chart";
import Header from "../Header";
import PoolInfo from "../PoolInfo";

const BaseLayout: React.FC = () => {
  return (
    <div className="bg-black m-32">
      <Header />
      <div>
        <Banner />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-8 p-5 ">
          <WidgetChart />
        </div>
        <div className="col-span-4 p-5">
          <PoolInfo />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
