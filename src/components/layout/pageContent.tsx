import { memo } from 'react';

const PageContent = ({
  currentStep,
  stepContents,
}: {
  currentStep: number;
  stepContents: JSX.Element[];
}) => {
  const currentContent = stepContents[currentStep];
  
  return (
    <div className="mt-2">
      {/* 使用 key 属性来帮助 React 识别内容变化 */}
      <div key={currentStep}>
        {currentContent}
      </div>
    </div>
  );
};

// 使用 React.memo 避免不必要的重渲染
export default memo(PageContent);
