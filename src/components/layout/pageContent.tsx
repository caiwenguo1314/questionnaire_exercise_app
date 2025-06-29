const PageContent = ({
  currentStep,
  stepContents,
}: {
  currentStep: number;
  stepContents: JSX.Element[];
}) => {
  // 注意 currentStep 是从 1 开始，数组是从 0 开始的
  const content = stepContents[currentStep];

  return <div className="mt-2">{content}</div>;
};

export default PageContent;
