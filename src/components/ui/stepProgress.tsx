//默认导出步骤条组件
export default function StepProgress(
  /* 形参 */ {
    steps,
    currentStep,
    setCurrentStep,
    canNavigateToStep,
  }: /* 对形参定义 */ {
    /* steps是一个数组，数组中的每个元素都是一个对象，包含两个属性，id是数字，label是字符串 */
    steps: { id: number; label: string }[];
    currentStep: number;
    setCurrentStep: (currentStep: number) => void;
    /* 验证函数，检查是否可以跳转到指定步骤 */
    canNavigateToStep?: (stepId: number) => boolean;
    /* current是一个数字，表示当前步骤 */
  }
) {
  /* 定义一个状态变量，用来存储当前步骤的id */
  // const [currentStep, setCurrentStep] = useState(1);
  /** 解决从外界传入current及时渲染 */
  // useEffect(() => {
  //   setStepCurrent(stepCurrent);
  // }, [stepCurrent,setStepCurrent]);

  return (
    /* 最外层包裹元素，设置居中，间距等 */
    <div className="flex items-center justify-center space-r-4 p-4 mb-4">
      {/* 遍历steps数组，生成每个步骤的元素, 对steps这个数组中每个元素都执行以下操作，并返回*/}
      {steps.map((step, index) => (
        /* 我的理解 所有返回的也需要在一个总的div中 */
        /* 总的包裹div 并标记key 包括step.id  step.label  加连接线 */
        <div key={step.id} className="flex items-center ">
          {/* 因为label要在id下面居中，又不影响id和连接线的对齐，label用决定定位脱离文档流，而设的父元素，开启相对定位 */}
          {/* 如果直接设在key那层的话，相当于给id，label和连接线的父元素设，会出现label参照id和连接线总体居中 */}
          <div className="relative">
            {/* 做一个8*8的圆，变小手，设一个过渡动画，0.3s，同时进行判断颜色，选中红色，未被选中浅灰，选中过深灰 */}
            <div
              /* 这是一个模版字符串，可以写变量 但要放到${变量}中 */
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold transition-all duration-300 
              ${
                /* 三元运算符 */
                currentStep === step.id
                  ? "bg-red-600"
                  : currentStep > step.id
                  ? "bg-gray-500"
                  : "bg-gray-300"
              }
              ${
                /* 检查是否可以点击 */
                canNavigateToStep && canNavigateToStep(step.id)
                  ? "cursor-pointer hover:scale-110"
                  : step.id <= currentStep
                  ? "cursor-pointer hover:scale-110"
                  : "cursor-not-allowed opacity-60"
              }
            `} /* 注册点击事件 */
              onClick={() => {
                // 只有在可以导航到该步骤时才允许跳转
                if (canNavigateToStep) {
                  if (canNavigateToStep(step.id)) {
                    setCurrentStep(step.id);
                  }
                } else {
                  // 默认行为：只能跳转到当前步骤或之前的步骤
                  if (step.id <= currentStep) {
                    setCurrentStep(step.id);
                  }
                }
              }}
            >
              {/* 插入变量 */}
              {step.id + 1}
            </div>
            {/* label */}
            <div /* 绝对定位，参照父元素定位，通过left-1/2 -translate-x-1/2 来居中 禁止换行 通过当前值判断颜色*/
              className={`text-sm font-medium absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${
                currentStep >= step.id ? "text-black" : "text-gray-400"
              }`}
            >
              {/* 插入变量 */}
              {step.label}
            </div>
          </div>
          {/* 最后一个步骤后面不添加虚线 */}
          {index < steps.length - 1 && (
            <div className="w-24 border border-dashed border-gray-400 mx-2"></div>
          )}
        </div>
      ))}
    </div>
  );
}
