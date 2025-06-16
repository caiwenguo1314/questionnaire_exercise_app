import React, { useEffect, useState } from "react";

export default function BankInfo() {
  /* 定义input的基本style */
  const inputStyle =
    "w-10/12 border border-gray-900 rounded-2xl ml-2 pl-2 h-8 bg-gray-100";
    /* 定义一个防抖函数 */
  const debounceFunction = (fn: Function, delay: number) => {
    /* 声明timer，同时定义类型 */
    let timer: NodeJS.Timeout;
    /* 返回执行回调函数 */
    return function (this: Function, ...args:[]) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        /* 将this指针指向fn（fn为接受的函数参数），arg为剩余参数是一个数组 */
        fn.apply(this, args);
      }, delay);
    };
  };

  const [inputValidation, setInputValidation] = useState<boolean[]>(
    Array(5).fill(false)
  );

  const inputHandleOnChange = debounceFunction(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      if (event.target.value.length > 0 && event.target.value.length < 20) {
        setInputValidation((prev) => {
          const newArr = [...prev];
          newArr[0] = true;
          console.log("newArr:", newArr);
          return newArr;
        });
      } else {
        setInputValidation((prev) => {
          const newArr = [...prev];
          newArr[0] = false;
          return newArr;
        });
      }
    },
    500
  );
  useEffect(() => {
    console.log(inputValidation);
  }, [inputValidation]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Add New Payout Account</h1>
      <h3 className="mt-4 text-sm">
        The bank will validate your information with the relevant documentation
        before any funds can be transferred to this bank account
      </h3>
      <h3 className="mt-2 text-sm">
        All fields marked with<span className="text-red-700 px-1">*</span>are
        mandatory
      </h3>
      {/* input 输入框外层div */}
      <div className="flex flex-wrap">
        <div className="w-1/2 my-4">
          <h4 className="pl-3">
            Account holder's name<span className="text-red-700">*</span>
          </h4>
          <input
            type="text"
            placeholder="Enter bank account holder name"
            title="Account holder's name"
            className={`${inputStyle}`}
            onChange={inputHandleOnChange}
          />
          {!inputValidation[0] && (
            <h4 className="text-red-700 pl-3">请输入正确的姓名</h4>
          )}
        </div>
        <div className="w-1/2 my-4">
          <h4 className="pl-3">
            Bank name<span className="text-red-700">*</span>
          </h4>
          <input
            type="text"
            placeholder="Bank name"
            title="Bank name"
            className={`${inputStyle}`}
          />
        </div>
        <div className="w-1/2 my-4">
          <h4 className="pl-3">
            Bank account number<span className="text-red-700">*</span>
          </h4>
          <input
            type="text"
            placeholder="Enter bank account number"
            title="Bank account number"
            className={`${inputStyle}`}
          />
        </div>
        <div className="w-1/2 my-4">
          <h4 className="pl-3">Branch name</h4>
          <input
            type="text"
            placeholder="Enter branch name"
            title="Branch name"
            className={`${inputStyle}`}
          />
        </div>
        <div className="w-1/2 my-4">
          <h4 className="pl-3">Branch address</h4>
          <input
            type="text"
            placeholder="Branch address"
            title="Branch address"
            className={`${inputStyle}`}
          />
        </div>
      </div>
    </div>
  );
}
