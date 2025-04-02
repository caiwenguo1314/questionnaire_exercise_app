import React, { useState } from "react";

interface AssuredCardData {
  name: string;
  insurance: {
    insurancePiece: string;
    insuranceNumber: string;
  }[];
}
export default function AssuredCard({
  AssuredCardData,
}: {
  AssuredCardData: AssuredCardData[];
}) {
  const [selected, setSelected] = useState<boolean[]>(
    Array(AssuredCardData.length).fill(false)
  );
  const handleClick = (index: number) => {
    setSelected((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };
  return (
    <div>
      {AssuredCardData.map((item, index) => (
        <div
          key={index}
          className="w-full h-32 bg-white border-none rounded-3xl mt-4 shadow-md"
        >
          <div
            className={`w-5 h-5 border rounded-full relative top-3 left-5 ${
              selected[index] ? "bg-blue-500" : " border-gray-600"
            } flex justify-center items-center shadow-lg `}
            onClick={()=>handleClick(index)}
          >
            <div
              className={`w-2 h-2  rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                selected[index] ? "bg-white" : "border-none"
              }`}
            ></div>
          </div>
          <div className="relative left-14 -top-4 font-bold text-2xl">
            {item.name}
          </div>
          <div className="flex relative left-10 top-6 gap-8">
            {item.insurance.map((item, index) => (
              <div key={index}>
                <div>{item.insurancePiece}</div>
                <div>{item.insuranceNumber}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
