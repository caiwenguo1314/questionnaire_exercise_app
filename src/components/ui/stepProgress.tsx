import { useEffect, useState } from "react";



export default function StepProgress({steps, current}: {steps: {id:number,label:string}[], current: number}) {
  const [currentStep, setCurrentStep] = useState(1);
  /* 解决从外界传入current及时渲染 */
  useEffect(() => {
    setCurrentStep(current); 
  }, [current])

  return (
    <div className="flex items-center justify-center space-x-4 p-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold cursor-pointer transition-all duration-300 
              ${
                currentStep === step.id
                  ? "bg-red-600"
                  : currentStep > step.id
                  ? "bg-gray-500"
                  : "bg-gray-300"
              }
            `}
            onClick={() => setCurrentStep(step.id)}
          >
            {step.id}
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              currentStep >= step.id ? "text-black" : "text-gray-400"
            }`}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div className="w-12 h-px bg-gray-400 mx-2"></div>
          )}
        </div>
      ))}
    </div>
  );
}
