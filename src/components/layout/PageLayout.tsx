import { SettingOutlined } from "@ant-design/icons";
import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function PageLayout() {
  return (
    <div>
      <header className="mt-4">
        {/* 最外层div */}
        <div className="flex justify-between mx-6 text-3xl">
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
          <div >
            <SettingOutlined className="text-3xl"/>
            <input
              type="text"
              title="My profile"
              className="w-28 border-4 border-gray-900 rounded-2xl ml-2 "
            />
          </div>
        </div>
        {/* 步骤调div */}
        <div></div>
      </header>
    </div>
  );
}
