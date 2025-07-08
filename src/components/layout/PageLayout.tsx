import { SettingOutlined } from "@ant-design/icons";
// import StepProgress from "components/ui/stepProgress";
// import { Outlet, useLocation } from "react-router-dom";
// import useQuestionnaireContext from "hooks/useQuestionnaireContext";
import { useEffect, useRef, useState } from "react";
import PageContent from "./pageContent";
import PolicySelect from "pages/PolicySelect";
import BankInfo from "pages/BankInfo";
import Review from "pages/Review";
import ContinueButton from "components/ui/continueButton";
import BackButton from "components/ui/backButton";
import StepProgress from "components/ui/stepProgress";
import QuestionnaireForm from "pages/QuestionnaireForm";

export default function PageLayout() {
  /* 使用自定义钩子 */
  const [currentStep, setCurrentStep] = useState(0);
  // const { pathname } = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );
  const [isBankInfoValid, setIsBankInfoValid] = useState(false);

  const stepContents = [
    <PolicySelect
      selectedUserIndex={selectedUserIndex}
      setSelectedUserIndex={setSelectedUserIndex}
    />,
    <QuestionnaireForm />,
    <BankInfo setIsBankInfoValid={setIsBankInfoValid} />,
    <Review />,
  ];

  useEffect(() => {
    let shouldDisable = true;

    switch (currentStep) {
      case 0:
        shouldDisable = selectedUserIndex === null;
        break;
      case 1:
        shouldDisable = false;
        break;
      case 2:
        shouldDisable = !isBankInfoValid;
        break;
      case 3:
        shouldDisable = true;
        break;
    }

    setBtnDisabled(shouldDisable);
  }, [selectedUserIndex, currentStep, isBankInfoValid]); 


  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <header className="mt-4">
        <div className="flex justify-between px-6 text-2xl pb-4 border-b-2  ">
          <div className="flex gap-4 font-bold">
            <div className="cursor-pointer">PRUDENTIAL</div>
            <div className="cursor-pointer">Home</div>
            <div className="cursor-pointer">Payments</div>
            <div className="cursor-pointer">Claim</div>
            <div className="cursor-pointer">Investments</div>
            <div className="cursor-pointer">Documents</div>
          </div>
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
      <main>
        <StepProgress
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          steps={[
            { id: 0, label: "Policy Selection" },
            { id: 1, label: "Questionnaire" },
            { id: 2, label: "Bank Information" },
            { id: 3, label: "Review" },
          ]}
        />
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto px-4 py-6 max-h-[530px] 
        overflow-y-auto overflow-x-hidden custom-scrollbar transition-opacity duration-300"
        >
          <PageContent currentStep={currentStep} stepContents={stepContents} />
        </div>
      </main>
      <footer className="relative border-t-2 border-gray-100 ">
        {/* <div className="absolute -top-8 left-8 ">
          <span>
            In case of any queries, please contact our customers relations
            officer at Prudential Customers Line:1500085/1500577
          </span>
        </div> */}

        <div className="fixed bottom-4 right-4 flex gap-6">
          <BackButton
            label="Back"
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          <ContinueButton
            label="Continue"
            currentStep={currentStep}
            btnDisabled={btnDisabled}
            setCurrentStep={setCurrentStep}
            stepContents={stepContents}
          />
        </div>
      </footer>
    </div>
  );
}
