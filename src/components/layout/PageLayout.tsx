import { SettingOutlined } from "@ant-design/icons";
import StepProgress from "components/ui/stepProgress";
import BankInfo from "pages/BankInfo";
import PolicySelect from "pages/PolicySelect";
import QuestionnaireForm from "pages/QuestionnaireForm";
import Review from "pages/Review";
import { useEffect, useState } from "react";
import PageContent from "./pageContent";

export default function PageLayout() {
  /* 使用自定义钩子 */
  const [currentStep, setCurrentStep] = useState(0);

  const [btnDisabled, setBtnDisabled] = useState(true);

  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );

  // 获取选中用户的数据
  const assuredCardData = [
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

  const selectedCardData =
    selectedUserIndex !== null ? assuredCardData[selectedUserIndex] : null;

  // 当用户选择变化时，清除相关数据
  const handleUserSelectionChange = (index: number) => {
    // 如果选择了不同的用户，清除sessionStorage中的相关数据
    if (selectedUserIndex !== index) {
      // 清除银行信息相关的数据
      const bankFields = [
        "accountHolderNameDetails",
        "bankNameDetails",
        "bankAccountNumberDetails",
        "branchNameDetails",
        "branchAddressDetails",
      ];
      bankFields.forEach((field) => {
        if (selectedUserIndex !== null) {
          sessionStorage.removeItem(`${selectedUserIndex}_${field}`);
        }
      });

      // 清除问卷相关的数据
      const questionnaireFields = [
        "admissionDate",
        "dischargeDate",
        "hospitalName",
        "thirdPartyClaim",
      ];
      questionnaireFields.forEach((field) => {
        if (selectedUserIndex !== null) {
          sessionStorage.removeItem(
            `${selectedUserIndex}_questionnaire_${field}`
          );
        }
      });

      // 清除账单数组数据
      if (selectedUserIndex !== null) {
        sessionStorage.removeItem(`${selectedUserIndex}_billsArray`);
      }

      // 重置验证状态
      setIsBankInfoValid(false);
      setIsQuestionnaireValid(false);
    }

    setSelectedUserIndex(index);
  };
  const [isBankInfoValid, setIsBankInfoValid] = useState(false);
  const [isQuestionnaireValid, setIsQuestionnaireValid] = useState(false);

  const stepContents = [
    <PolicySelect
      selectedUserIndex={selectedUserIndex}
      setSelectedUserIndex={handleUserSelectionChange}
    />,
    <QuestionnaireForm
      setIsQuestionnaireValid={setIsQuestionnaireValid}
      selectedUserIndex={selectedUserIndex}
      selectedCardData={selectedCardData}
    />,
    <BankInfo
      setIsBankInfoValid={setIsBankInfoValid}
      selectedUserIndex={selectedUserIndex}
    />,
    <Review
      selectedCardData={selectedCardData}
      selectedUserIndex={selectedUserIndex}
    />,
  ];

  // 验证函数：检查是否可以跳转到指定步骤
  const canNavigateToStep = (stepId: number): boolean => {
    switch (stepId) {
      case 0:
        return true; // 第一步总是可以访问
      case 1:
        return selectedUserIndex !== null; // 需要选择用户
      case 2:
        return selectedUserIndex !== null && isQuestionnaireValid; // 需要完成问卷
      case 3:
        return selectedUserIndex !== null && isQuestionnaireValid && isBankInfoValid; // 需要完成所有前置步骤
      default:
        return false;
    }
  };

  useEffect(() => {
    let shouldDisable = true;
    switch (currentStep) {
      case 0:
        shouldDisable = selectedUserIndex === null;
        break;
      case 1:
        shouldDisable = !isQuestionnaireValid;
        break;
      case 2:
        shouldDisable = !isBankInfoValid;
        break;
      case 3:
        shouldDisable = true;
        break;
    }

    setBtnDisabled(shouldDisable);
  }, [selectedUserIndex, currentStep, isBankInfoValid, isQuestionnaireValid]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="flex justify-between items-center px-8 py-5">
          <div className="flex gap-8 text-lg font-medium">
            <div className="cursor-pointer text-blue-600 font-bold text-xl">
              PRUDENTIAL
            </div>
            <div className="cursor-pointer hover:text-blue-600 transition-all duration-200 hover:scale-105">
              Home
            </div>
            <div className="cursor-pointer hover:text-blue-600 transition-all duration-200 hover:scale-105">
              Payments
            </div>
            <div className="cursor-pointer hover:text-blue-600 transition-all duration-200 hover:scale-105">
              Claim
            </div>
            <div className="cursor-pointer hover:text-blue-600 transition-all duration-200 hover:scale-105">
              Investments
            </div>
            <div className="cursor-pointer hover:text-blue-600 transition-all duration-200 hover:scale-105">
              Documents
            </div>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              title="Search"
              className="w-48 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <SettingOutlined className="text-xl text-gray-600 cursor-pointer hover:text-blue-600 transition-all duration-200 hover:scale-110" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Step Progress */}
        <div className="">
          <div className="p-6">
            <StepProgress
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              canNavigateToStep={canNavigateToStep}
              steps={[
                { id: 0, label: "Policy Selection" },
                { id: 1, label: "Questionnaire" },
                { id: 2, label: "Bank Information" },
                { id: 3, label: "Review" },
              ]}
            />
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 pb-24">
          <div className="max-w-6xl mx-auto px-6 py-8 min-h-[calc(100vh-320px)] bg-white my-6 rounded-2xl shadow-lg border border-gray-100">
            <PageContent
              currentStep={currentStep}
              stepContents={stepContents}
            />
          </div>
        </main>
      </div>
      {/* Fixed Action Buttons */}
      <div className="fixed bottom-8 right-8 flex gap-4 z-10">
        <button
          onClick={() => {
            if (currentStep > 0) {
              setCurrentStep(currentStep - 1);
            }
          }}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg ${
            currentStep === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-xl border border-gray-200 hover:border-gray-300"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back</span>
        </button>
        <button
          onClick={() => {
            if (currentStep < stepContents.length - 1) {
              setCurrentStep(currentStep + 1);
            }
          }}
          disabled={btnDisabled}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105 ${
            btnDisabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-xl"
          }`}
        >
          <span>{currentStep === 3 ? "Submit Application" : "Continue"}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
