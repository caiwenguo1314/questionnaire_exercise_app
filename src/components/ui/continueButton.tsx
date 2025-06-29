import { Button } from "antd";

const ContinueButton = ({
  label,
  currentStep,
  btnDisabled,
  setCurrentStep,
  stepContents,
}: {
  label: string;
  currentStep: number;
  btnDisabled: boolean;
  setCurrentStep: (step: number) => void;
  stepContents: React.ReactNode[];
}) => {
  const onSubmit = () => {};
  console.log("currentStep", currentStep);
  return (
    <Button
      size="large"
      onClick={
        currentStep <= stepContents.length - 1
          ? () => setCurrentStep(currentStep + 1)
          : onSubmit
      }
      disabled={btnDisabled}
    >
      {label}
    </Button>
  );
};

export default ContinueButton;
