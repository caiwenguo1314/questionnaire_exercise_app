import { SettingOutlined } from "@ant-design/icons";
import StepProgress from "components/ui/stepProgress";
import BankInfo from "pages/BankInfo";
import PolicySelect from "pages/PolicySelect";
import QuestionnaireForm from "pages/QuestionnaireForm";
import Review from "pages/Review";
import { useEffect, useState, useMemo, useCallback } from "react";
import PageContent from "./pageContent";

export default function PageLayout() {
  /* 当前步骤 */

  const [currentStep, setCurrentStep] = useState(0);
  /* 下一步按钮是否禁用 */
  const [btnDisabled, setBtnDisabled] = useState(true);
  /* 选中的用户索引 */
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );
  /* 银行信息是否有效 */
  const [isBankInfoValid, setIsBankInfoValid] = useState(false);

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
  /* 选中的用户数据 */
  const selectedCardData =
    selectedUserIndex !== null ? assuredCardData[selectedUserIndex] : null;

  // 新增：问卷表单状态
  const [questionnaireData, setQuestionnaireData] = useState<{
    [key: string]: {
      admissionDate?: string;
      dischargeDate?: string;
      hospitalName?: string;
      thirdPartyClaim?: string;
      billsArray?: number[];
    };
  }>({});

  // 新增：银行信息状态
  const [bankInfoData, setBankInfoData] = useState<{
    [key: string]: {
      accountHolderNameDetails?: string;
      bankNameDetails?: string;
      bankAccountNumberDetails?: string;
      branchNameDetails?: string;
      branchAddressDetails?: string;
    };
  }>({});

  /* 问卷表单是否有效 */
  const handleUserSelectionChange = (index: number) => {
    if (selectedUserIndex !== index) {
      // 重置验证状态
      setIsBankInfoValid(false);
      setIsQuestionnaireValid(false);
    }

    setSelectedUserIndex(index);
  };

  const [isQuestionnaireValid, setIsQuestionnaireValid] = useState(false);

  // 更新问卷数据的函数
  const updateQuestionnaireData = (field: string, value: any) => {
    if (selectedUserIndex === null) return;

    setQuestionnaireData((prev) => {
      const userKey = `${selectedUserIndex}`;
      const userData = prev[userKey] || {};

      return {
        ...prev,
        [userKey]: {
          ...userData,
          [field]: value,
        },
      };
    });
  };

  // 更新银行信息的函数
  const updateBankInfoData = (field: string, value: any) => {
    if (selectedUserIndex === null) return;

    setBankInfoData((prev) => {
      const userKey = `${selectedUserIndex}`;
      const userData = prev[userKey] || {};

      return {
        ...prev,
        [userKey]: {
          ...userData,
          [field]: value,
        },
      };
    });
  };

  const stepContents = useMemo(() => [
    <PolicySelect
      selectedUserIndex={selectedUserIndex}
      setSelectedUserIndex={handleUserSelectionChange}
    />,
    <QuestionnaireForm
      setIsQuestionnaireValid={setIsQuestionnaireValid}
      selectedUserIndex={selectedUserIndex}
      selectedCardData={selectedCardData}
      questionnaireData={questionnaireData[`${selectedUserIndex}`] || {}}
      updateQuestionnaireData={updateQuestionnaireData}
    />,
    <BankInfo
      setIsBankInfoValid={setIsBankInfoValid}
      selectedUserIndex={selectedUserIndex}
      bankInfoData={bankInfoData[`${selectedUserIndex}`] || {}}
      updateBankInfoData={updateBankInfoData}
    />,
    <Review
      selectedCardData={selectedCardData}
      selectedUserIndex={selectedUserIndex}
      bankInfoData={bankInfoData[`${selectedUserIndex}`] || {}}
      questionnaireData={questionnaireData[`${selectedUserIndex}`] || {}}
    />,
  ], [selectedUserIndex, selectedCardData, questionnaireData, bankInfoData, handleUserSelectionChange, updateQuestionnaireData, updateBankInfoData]);

  // 验证函数：检查是否可以跳转到指定步骤
  const canNavigateToStep = useCallback((stepId: number): boolean => {
    switch (stepId) {
      case 0:
        return true; // 第一步总是可以访问
      case 1:
        return selectedUserIndex !== null; // 需要选择用户
      case 2:
        return selectedUserIndex !== null && isQuestionnaireValid; // 需要完成问卷
      case 3:
        return (
          selectedUserIndex !== null && isQuestionnaireValid && isBankInfoValid
        ); // 需要完成所有前置步骤
      default:
        return false;
    }
  }, [selectedUserIndex, isQuestionnaireValid, isBankInfoValid]);

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
        <div className="flex justify-between items-center px-4 md:px-8 py-3 md:py-5">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-2 md:gap-8">
            <div className="cursor-pointer text-blue-600 font-bold text-lg md:text-xl">
              PRUDENTIAL
            </div>
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex gap-8 text-lg font-medium">
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
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search - Hidden on small screens, smaller on medium */}
            <input
              type="text"
              placeholder="Search..."
              title="Search"
              className="hidden sm:block w-32 md:w-48 px-3 md:px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <SettingOutlined className="text-lg md:text-xl text-gray-600 cursor-pointer hover:text-blue-600 transition-all duration-200 hover:scale-110" />

            {/* Mobile Menu Button - Only visible on mobile */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Step Progress */}
        <div className="px-2 md:px-0">
          <div className="p-3 md:p-6 pb-12 md:pb-16">
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
        <main className="flex-1 pb-24 md:pb-24">
          <div className="max-w-6xl mx-auto px-3 md:px-6 py-4 md:py-8 bg-white my-3 md:my-6 rounded-xl md:rounded-2xl shadow-lg border border-gray-100 min-h-[500px]">
            <PageContent
              currentStep={currentStep}
              stepContents={stepContents}
            />
          </div>
        </main>
      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-0 md:bottom-8 left-0 right-0 md:left-auto md:right-8 md:w-auto z-10">
        {/* Mobile background overlay */}
        <div className="md:hidden bg-gradient-to-t from-white via-white/95 to-transparent pt-6 pb-4 px-4">
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1);
                }
              }}
              disabled={currentStep === 0}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg ${
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
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105 ${
                btnDisabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-xl"
              }`}
            >
              <span className="text-sm">
                {currentStep === 3 ? "Submit Application" : "Continue"}
              </span>
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
        
        {/* Desktop buttons */}
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep(currentStep - 1);
              }
            }}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg ${
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
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105 ${
              btnDisabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-xl"
            }`}
          >
            <span>
              {currentStep === 3 ? "Submit Application" : "Continue"}
            </span>
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
    </div>
  );
}
