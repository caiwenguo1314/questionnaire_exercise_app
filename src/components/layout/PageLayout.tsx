import { SettingOutlined } from "@ant-design/icons";
import FootButton from "components/ui/footButton";
import StepProgress from "components/ui/stepProgress";
import { Outlet, useLocation } from "react-router-dom";
import useQuestionnaireContext from "hooks/useQuestionnaireContext";
import { useEffect, useRef } from "react";

export default function PageLayout() {
  /* 使用自定义钩子 */
  const { Steps, stepCurrent, footButtonOnClick } = useQuestionnaireContext();
  const {pathname} = useLocation()
  const contentRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    if(contentRef.current){
      contentRef.current.scrollTo({
        top:0,
        behavior:'smooth'
      }) 
    }// 滚动到顶部
  },[pathname])
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <header className="mt-4">
        {/* 导航条和搜索外层div */}
        <div className="flex justify-between px-6 text-2xl pb-4 border-b-2  ">
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
      </header>
      {/* 主要内容区,语义标签且唯一 */}
      {/* <main className="flex-1 bg-gray-100"> */}
      <main className={`flex-1 ${stepCurrent===1?'bg-gray-100':'bg-white-50'}`}>
        {/* 步骤条 */}
        <StepProgress steps={Steps} />
        <div ref={contentRef}
          className="max-w-4xl mx-auto px-4 py-6 max-h-[530px] 
        overflow-y-auto overflow-x-hidden custom-scrollbar transition-opacity duration-300"
        >
          <Outlet />
        </div>
      </main>
      {/* 底部页脚 */}
      <footer className="relative border-t-2 border-gray-100 ">
        <div className="absolute -top-8 left-8 ">
          <span>
            In case of any queries, please contact our customers relations
            officer at Prudential Customers Line:1500085/1500577
          </span>
        </div>
        <div className="flex w-full bg-write justify-end h-20 items-center ">
          <FootButton
            label="Back"
            current={stepCurrent}
            onClick={footButtonOnClick}
          />
          <FootButton
            label="Continue"
            current={stepCurrent}
            onClick={footButtonOnClick}
          />
        </div>
      </footer>
    </div>
  );
}
