import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function PageLayout() {
  return (
    <div>
      <header>
        {/* 最外层div */}
        <div>
          {/* 导航条外层div */}
          <div>
            <div>PRUDENTIAL</div>
            <div>Home</div>
            <div>Payments</div>
            <div>Claim</div>
            <div>Investments</div>
            <div>Documents</div>
          </div>
          {/* 搜索外层div */}
          <div>
            <div>齿轮</div>
            <input
              type="text"
              title="My profile"
              className="w-10 bg-blue-200 "
            />
          </div>
        </div>
        {/* 步骤调div */}
        <div>
            
        </div>
      </header>
    </div>
  );
}
