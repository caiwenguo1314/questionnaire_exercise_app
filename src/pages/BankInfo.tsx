import React, { useEffect, useState } from "react";
import useQuestionnaireContext from "hooks/useQuestionnaireContext";
import UploadCard from "components/ui/uploadCard";

export default function BankInfo() {
  /* 定义input的基本style */
  const inputStyle =
    "w-10/12 border border-gray-900 rounded-2xl ml-2 pl-2 h-8 bg-gray-100";
  /* 定义一个防抖函数 */
  const debounceFunction = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: []) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  /* 接受context */
  const { validationState, setValidationState, inputValue, setInputValue } =
    useQuestionnaireContext();
  // interface validationState {
  //   AccountHolderName: boolean;
  //   BankName: boolean;
  //   BankAccountNumber: boolean;
  //   BranchName: boolean;
  //   BranchAddress: boolean;
  // }
  /* 我要定义一个对象来保存每一个input的状态 */
  // const [validationState, setValidationState] = useState({
  //   AccountHolderName: false,
  //   BankName: false,
  //   BankAccountNumber: false,
  //   BranchName: false,
  //   BranchAddress: false,
  // });
  /* 我要定义一个接受value的对象，来保存value的值 */
  // const [inputValue, setInputValue] = useState({
  //   AccountHolderName: "",
  //   BankName: "",
  //   BankAccountNumber: "",
  //   BranchName: "",
  //   BranchAddress: "",
  // });
  /* 我要定义一个函数来处理input的onChange事件,接受event并用inputValue来保存 */
  const updateInputValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;
    // const newInputValue = { ...inputValue, [name]: value };
    const newInputValue = { ...inputValue, [name]: value };
    setInputValue(newInputValue);
    console.log(newInputValue);
    const newValidationState = { ...validationState, [name]: true };
    setValidationState(newValidationState);
    console.log(newValidationState);
  };
  /* 下面我要写一个higher-order function 来做对event.target.value的校验 
  包括length、regex*/
  const validateInputEvent = (
    minlength: number,
    maxlength: number,
    regex: RegExp
  ) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const name = event.target.name;
      if (
        value.length >= minlength &&
        value.length <= maxlength &&
        regex.test(value)
      ) {
        updateInputValueHandler(event);
      } else {
        const newInputValue = { ...inputValue, [name]: "" };
        setInputValue(newInputValue);
        const newValidationState = { ...validationState, [name]: false };
        setValidationState(newValidationState);
        console.log(`Validation failed for ${name}: value=${value}`);
      }
    };
  };
  useEffect(() => {
    console.log("inputValue:", inputValue);
    console.log("validationState:", validationState);
  }, [inputValue, validationState]);
  /* 配置ValidationConfig*/
  interface ValidationConfig {
    minLength: number;
    maxLength: number;
    regex: RegExp;
  }
  /* 定义个input的ValidationConfig */
  const inputValidationConfig: Record<string, ValidationConfig> = {
    AccountHolderName: {
      minLength: 2,
      maxLength: 50,
      regex: /^[\p{L}\s'-]+$/u,
    },
    BankName: {
      minLength: 2,
      maxLength: 100,
      regex: /^[\p{L}\d\s()-]+$/u,
    },
    BankAccountNumber: {
      minLength: 8,
      maxLength: 34,
      regex: /^[\d\s-]+$/u,
    },
    BranchName: {
      minLength: 2,
      maxLength: 100,
      regex: /^[\p{L}\d\s()-]+$/u,
    },
    BranchAddress: {
      minLength: 5,
      maxLength: 200,
      regex: /^[\p{L}\d\s,.-]+$/u,
    },
  };
  const [selected, setSelected] = useState(false);
  const onClick = () => {
    setSelected(!selected);
  };
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
            name="AccountHolderName"
            onChange={debounceFunction(
              validateInputEvent(
                inputValidationConfig.AccountHolderName.minLength,
                inputValidationConfig.AccountHolderName.maxLength,
                inputValidationConfig.AccountHolderName.regex
              ),
              300
            )}
          />
          {!validationState.AccountHolderName && (
            <h4 className="text-red-700 pl-3">请正确输入</h4>
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
            name="BankName"
            onChange={debounceFunction(
              validateInputEvent(
                inputValidationConfig.BankName.minLength,
                inputValidationConfig.BankName.maxLength,
                inputValidationConfig.BankName.regex
              ),
              300
            )}
          />
          {!validationState.BankName && (
            <h4 className="text-red-700 pl-3">请正确输入</h4>
          )}
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
            name="BankAccountNumber"
            onChange={debounceFunction(
              validateInputEvent(
                inputValidationConfig.BankAccountNumber.minLength,
                inputValidationConfig.BankAccountNumber.maxLength,
                inputValidationConfig.BankAccountNumber.regex
              ),
              300
            )}
          />
          {!validationState.BankAccountNumber && (
            <h4 className="text-red-700 pl-3">请正确输入</h4>
          )}
        </div>
        <div className="w-1/2 my-4">
          <h4 className="pl-3">Branch name</h4>
          <input
            type="text"
            placeholder="Enter branch name"
            title="Branch name"
            className={`${inputStyle}`}
            name="BranchName"
            onChange={debounceFunction(
              validateInputEvent(
                inputValidationConfig.BranchName.minLength,
                inputValidationConfig.BranchName.maxLength,
                inputValidationConfig.BranchName.regex
              ),
              300
            )}
          />
          {!validationState.BranchName && (
            <h4 className="text-red-700 pl-3">请正确输入</h4>
          )}
        </div>
        <div className="w-1/2 my-4">
          <h4 className="pl-3">Branch address</h4>
          <input
            type="text"
            placeholder="Branch address"
            title="Branch address"
            className={`${inputStyle}`}
            name="BranchAddress"
            onChange={debounceFunction(
              validateInputEvent(
                inputValidationConfig.BranchAddress.minLength,
                inputValidationConfig.BranchAddress.maxLength,
                inputValidationConfig.BranchAddress.regex
              ),
              300
            )}
          />
          {!validationState.BranchAddress && (
            <h4 className="text-red-700 pl-3">请正确输入</h4>
          )}
        </div>
      </div>
      <UploadCard item={{ name: "First page savings book" }} />
      <div className="w-full  flex justify-start items-center py-2">
        <div
          className={`w-4 h-4 border rounded-full relative mr-2 ${
            selected ? "bg-blue-500" : " border-gray-600"
          } flex justify-center items-center shadow-lg `}
          onClick={onClick}
        >
          <div
            className={`w-1.5 h-1.5  rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "bg-white" ${
              selected ? "bg-white" : "border-none"
            }`}
          ></div>
        </div>
        <span className="text-xs">
          I declare that have read under stood and fully agreed to the{" "}
          <span className="text-red-600">Terms and Conditions</span> for adding
          the new payout account including the privacy policy.
        </span>
      </div>
    </div>
  );
}
