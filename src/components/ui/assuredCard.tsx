import { useEffect, useState } from "react";
import { AssuredPerson } from "../../types/form";

export default function AssuredCard({
  assuredCardData,
  selectedUserIndex,
  setSelectedUserIndex,
}: {
  assuredCardData: AssuredPerson[];
  selectedUserIndex: number | null;
  setSelectedUserIndex: (index: number) => void;
}) {


  const onChooseUser = (index: number) => () => {
    setSelectedUserIndex(index);
  };

  return (
    <div className="space-y-4">
      {assuredCardData.map((item, index) => (
        <div
          key={index}
          className={`w-full bg-white border-2 rounded-lg p-6 shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md ${
            selectedUserIndex === index 
              ? "border-blue-500 bg-blue-50" 
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={onChooseUser(index)}
        >
          <div className="flex items-start space-x-4">
            {/* Radio Button */}
            <div className="flex-shrink-0 mt-1">
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                  selectedUserIndex === index 
                    ? "bg-blue-600 border-blue-600" 
                    : "border-gray-300 bg-white hover:border-gray-400"
                }`}
              >
                {selectedUserIndex === index && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {item.name}
              </h3>
              
              {/* Insurance Policies */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {item.insurance.map((insurance, insuranceIndex) => (
                  <div 
                    key={insuranceIndex}
                    className="bg-gray-50 rounded-md p-3 border border-gray-200"
                  >
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      {insurance.insurancePiece}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {insurance.insuranceNumber}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
