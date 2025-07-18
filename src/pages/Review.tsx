import React, { useState } from "react";
import { AssuredPerson } from "types/form";

export default function Review() {
  const [selectedCardData, setSelectedCardData] =
    /* useState这里要明确接受参数的类型 */
    useState<AssuredPerson | null>(null);

  const [inputValue, setInputValue] = useState({
    AccountHolderName: "",
    BankName: "",
    BankAccountNumber: "",
    BranchName: "",
    BranchAddress: "",
  });

  return (
    <div>
      {/* 展示第一页Account */}
      <div className="w-full h-32 bg-white border-none rounded-3xl mt-4 shadow-md">
        <div className="relative left-14 -top-4 font-bold text-2xl">
          {selectedCardData?.name}
        </div>
        {/* 对保险内容进行遍历 */}
        <div className="flex relative left-10 top-6 gap-8">
          {selectedCardData?.insurance.map((item, index) => (
            <div key={index}>
              <div>{item.insurancePiece}</div>
              <div>{item.insuranceNumber}</div>
            </div>
          ))}
        </div>
      </div>
      {/* 展示第三页bankInfo */}
      <div className="flex flex-wrap">
        <div className="w-1/2 my-4">
          <h4 className="pl-3">
            Account holder's name<span className="text-red-700">*</span>
          </h4>
          <div>
            <span className="pl-3">{inputValue.AccountHolderName}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-1/2 my-4">
          <h4 className="pl-3">
            Bank name<span className="text-red-700">*</span>
          </h4>
          <div>
            <span className="pl-3">{inputValue.BankName}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-1/2 my-4">
          <h4 className="pl-3">
            Bank account number<span className="text-red-700">*</span>
          </h4>
          <div>
            <span className="pl-3">{inputValue.BankAccountNumber}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-1/2 my-4">
          <h4 className="pl-3">
            Branch name<span className="text-red-700">*</span>
          </h4>
          <div>
            <span className="pl-3">{inputValue.BranchName}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-1/2 my-4">
          <h4 className="pl-3">
            Branch address<span className="text-red-700">*</span>
          </h4>
          <div>
            <span className="pl-3">{inputValue.BranchAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
