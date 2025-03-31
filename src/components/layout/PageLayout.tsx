import { SettingOutlined } from "@ant-design/icons";
import StepProgress from "components/ui/stepProgress";
import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function PageLayout() {
  // const stepRound =
  //   "flex border rounded-full w-12 h-12 justify-center items-center";
  const steps = [
    { id: 1, label: "Life assured" },
    { id: 2, label: "Claim details" },
    { id: 3, label: "Payout details" },
    { id: 4, label: "review" },
  ];
  const current = 1;
  return (
    <div>
      <header className="mt-4">
        {/* 导航条和搜索外层div */}
        <div className="flex justify-between px-6 text-3xl pb-6 border-b-2  ">
          {/* 导航条外层div */}
          <div className="flex gap-4 font-bold">
            <div>PRUDENTIAL</div>
            <div>Home</div>
            <div>Payments</div>
            <div>Claim</div>
            <div>Investments</div>
            <div>Documents</div>
          </div>
          {/* 搜索外层div */}
          <div>
            <SettingOutlined className="text-3xl" />
            <input
              type="text"
              placeholder="Search"
              title="My profile"
              className="w-32 border border-gray-900 rounded-2xl ml-2 pl-2 "
            />
          </div>
        </div>
        {/* 步骤调div */}
        {/* 步骤条外层div */}
        {/* <div className="flex justify-between max-w-6xl mx-auto mt-4 text-2xl">
          <div className={`${stepRound}`}>
            <span className="leading-none">1</span>
          </div>
          <div className={stepRound}>
            <span className="leading-none">2</span>
          </div>
          <div className={stepRound}>
            <span className="leading-none">3</span>
          </div>
          <div className={stepRound}>
            <span className="leading-none">4</span>
          </div>
        </div> */}
        <StepProgress steps={steps} current={current} />
      </header>
    </div>
  );
}
