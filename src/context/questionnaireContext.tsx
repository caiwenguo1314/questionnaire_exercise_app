import React, { createContext, useEffect, useState } from "react";
import { QuestionnaireContextType, AssuredPerson } from "../types/form";
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

  /* 创建一个useState来管理点击的状态，为了实现每个card的单独控制， */
  const [selected, setSelected] = useState<boolean[]>(
    Array(AssuredCardData.length).fill(false)
  );
  /* 创建一个接受数据的数组 */
  const [selectedCardData, setSelectedCardData] =
    /* useState这里要明确接受参数的类型 */
    useState<AssuredPerson | null>(null);

  const UploadCardsData = [
    {
      name: "Doctor's statement/Discharge summary",
    },
    {
      name: "Original official receipt and breakdown of billing",
    },
    {
      name: "Personal identity card",
    },
    {
      name: "Results and interpretation of laboratory and diagnostic tests",
    },
    {
      name: "Passport and/or boarding passName change letter",
    },
    {
      name: "Name change letter",
    },
    {
      name: "Coordination of bene fits from other insurance",
    },
    {
      name: "Attachment of room prices in hospital",
    },
    {
      name: "Other documents(if any)",
    },
  ];
  /* 定义一个input的状态 */
  const [thirdValidationState, setThirdValidationState] = useState({
    AccountHolderName: false,
    BankName: false,
    BankAccountNumber: false,
    BranchName: false,
    BranchAddress: false,
  });
  /* 我要定义一个接受inputValue的对象，来保存inputValue的值 */
  const [inputValue, setInputValue] = useState({
    AccountHolderName: "",
    BankName: "",
    BankAccountNumber: "",
    BranchName: "",
    BranchAddress: "",
  });
  /* 我要定义负责页面跳转的状态，因为我需要按页面来分，我想要把它定义成一个数组和current相关 */
  const [pageState, setPageState] = useState<Record<string, boolean>>(
    Steps.reduce((acc, item) => {
      acc[item.label] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );
  /* 写一个第二页的验证 */
  const [secondPageValidation, setSecondPageValidation] = useState(true);
  useEffect(() => {
    /* 写第一页的更新逻辑 */
    if (selected.includes(true)) {
      setPageState((prev) => {
        return {
          ...prev,
          [Steps[0].label]: true,
        };
      });
    } else {
      setPageState((prev) => {
        return {
          ...prev,
          [Steps[0].label]: false,
        };
      });
    }
    if (secondPageValidation) {
      setPageState((prev) => {
        return {
          ...prev,
          [Steps[1].label]: true,
        };
      });
    } else {
      setPageState((prev) => {
        return {
          ...prev,
          [Steps[1].label]: false,
        };
      });
    }
    if(Object.values(thirdValidationState).every((value)=>value===true)){
      setPageState((prev)=>{
        return{
          ...prev,
          [Steps[2].label]:true
        }
      })
    }else{
      setPageState((prev)=>{
        return{
          ...prev,
          [Steps[2].label]:false
        }
      })
    }
  }, [selected, secondPageValidation,thirdValidationState]);
  useEffect(() => {
    console.log("pageState:", pageState);
  }, [pageState]);
  /* 底部按钮的onClick函数 */
  const footButtonOnClick = (label: string) => {
    if (label === "Back" && stepCurrent > 1) {
      setStepCurrent(stepCurrent - 1);
      // console.log("back", stepCurrent);
    } else if (label === "Continue" && stepCurrent < RouterData.length) {
      if (selected.includes(true) && stepCurrent === 1) {
        setStepCurrent(stepCurrent + 1);
      } else if (stepCurrent === 2 && secondPageValidation) {
        setStepCurrent(stepCurrent + 1);
      } else if (stepCurrent === 3 && Object.values(thirdValidationState).every((value)=>value===true) ) {
        setStepCurrent(stepCurrent + 1);
      }

      // console.log("continue", stepCurrent);
    } else if (label === "Continue" && stepCurrent === RouterData.length) {
      // console.log("submit");
    }
  };
  /* 创建一个value对象，收集所有需要传递的内容 */
  const value = {
    AssuredCardData,
    Steps,
    stepCurrent,
    setStepCurrent,
    footButtonOnClick,
    selectedCardData,
    setSelectedCardData,
    selected,
    setSelected,
    UploadCardsData,
    thirdValidationState,
    setThirdValidationState,
    inputValue,
    setInputValue,
    pageState,
    setPageState,
  };

  return (
    /* value 属性接受一个对象，第一个{}表示表达式，如果分开写还需要一个{}，类同style */
    <questionnaireContext.Provider value={value}>
      {children}
    </questionnaireContext.Provider>
  );
}
