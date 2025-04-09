import React, { createContext, useEffect, useState } from "react";
import { QuestionnaireContextType } from "../types/form";
import { useNavigate } from "react-router-dom";

export const questionnaireContext =
  createContext<QuestionnaireContextType | null>(null);
/* 路由数据 */
const RouterData = ["policySelect", "questionnaire", "bankInfo", "review"];

export function QuestionnaireContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /* 创建虚拟保险数据，是一个数组 */
  const AssuredCardData = [
    {
      name: "John Doe",
      insurance: [
        {
          insurancePiece: "Piece of CakeTerm InsuranceA",
          insuranceNumber: "P30000000421",
        },
        {
          insurancePiece: "Piece of CakeTerm InsuranceB",
          insuranceNumber: "P30000000152",
        },
        {
          insurancePiece: "Piece of CakeTerm InsuranceC",
          insuranceNumber: "P30000000754",
        },
      ],
    },
    {
      name: "Jane Lou",
      insurance: [
        {
          insurancePiece: "Piece of CakeTerm InsuranceA",
          insuranceNumber: "P30000000231",
        },
        {
          insurancePiece: "Piece of CakeTerm InsuranceB",
          insuranceNumber: "P30000000762",
        },
      ],
    },
    {
      name: "Stallia Wong Yanghe",
      insurance: [
        {
          insurancePiece: "Piece of CakeTerm InsuranceA",
          insuranceNumber: "P30000000521",
        },
      ],
    },
  ];
  /* 创建虚拟步骤条数据，是一个数组 */
  const Steps = [
    { id: 1, label: "Life assured" },
    { id: 2, label: "Claim details" },
    { id: 3, label: "Payout details" },
    { id: 4, label: "review" },
  ];
  /* 记录当前显示步骤 */
  const [stepCurrent, setStepCurrent] = useState(1);

  /* 创建navigate */
  const navigate = useNavigate();
  /* 实现页面跳转 */
  useEffect(() => {
    if (stepCurrent >= 1 && stepCurrent <= RouterData.length) {
      navigate(`/form/${RouterData[stepCurrent - 1]}`);
    }
  }, [stepCurrent, navigate]);
  /* 底部按钮的onClick函数 */
  const footButtonOnClick = (label: string) => {
    if (label === "Back" && stepCurrent > 1) {
      setStepCurrent(stepCurrent - 1);
      // console.log("back", stepCurrent);
    } else if (label === "Continue" && stepCurrent < RouterData.length) {
      setStepCurrent(stepCurrent + 1);
      // console.log("continue", stepCurrent);
    } else if (label === "Continue" && stepCurrent === RouterData.length) {
      // console.log("submit");
    }
  };
  const value = {
    AssuredCardData,
    Steps,
    stepCurrent,
    setStepCurrent,
    footButtonOnClick,
  };
  return (
    /* value 属性接受一个对象，第一个{}表示表达式，如果分开写还需要一个{}，类同style */
    <questionnaireContext.Provider value={value}>
      {children}
    </questionnaireContext.Provider>
  );
}
