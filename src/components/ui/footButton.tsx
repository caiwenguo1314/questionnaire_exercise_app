import useQuestionnaireContext from "hooks/useQuestionnaireContext";
import React from "react";

export default function FootButton({
  /* 接收的参数，名字，步骤，点击事件 */
  label,
  stepCurrent,
  onClick,
}: {
  /* 定义参数 */
  label: string;
  stepCurrent: number;
  onClick: (label: string) => void;
}) {
  const {pageState,Steps} = useQuestionnaireContext();
  /* 写一个对continue的状态的判断 */
  const continueValid = ()=>{
    const stepLabel = Steps[stepCurrent -1].label;
    return pageState[stepLabel];
  }
  return (
    <div>
      <button
        className={`${
          (label === "Back" && stepCurrent > 1) || (label === "Continue"&&continueValid())
            ? "bg-blue-500"
            : "bg-gray-500"
        } text-white border rounded-full w-28 h-10 mr-4`}
        /* 点击事件 */
        onClick={() => onClick(label)}
      >
        {/* 判断最后一步，是的话改成Submit，current后期要替代成steps.length */}
        {stepCurrent === 4 && label === "Continue" ? "Submit" : label}
      </button>
    </div>
  );
}
