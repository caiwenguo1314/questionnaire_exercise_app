import { Button } from "antd";
const BackButton = ({
  label,
  currentStep,
  setCurrentStep,
}: {
  label: string;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) => {
  const onBack = () => {};
  return (
    <Button
      className="w-32"
      type="primary"
      // htmlType="button"
      shape="round"
      // icon={<LeftOutlined />}
      // size="large"
      size="large"
      onClick={
        currentStep >= 1 ? () => setCurrentStep(currentStep - 1) : onBack
      }
      disabled={currentStep === 0 ? true : false}
    >
      {label}
    </Button>
  );
};

export default BackButton;
