import React, { useEffect, useState } from "react";
import UploadCard from "components/ui/uploadCard";

export default function BankInfo({
  setIsBankInfoValid,
}: {
  setIsBankInfoValid: (isValid: boolean) => void;
}) {
  //定义输入框样式
  const inputStyle =
    "w-10/12 border border-gray-900 rounded-2xl ml-2 pl-2 h-8 bg-gray-100";

  //定义状态
  interface inputValueState {
    inputValue: string;
    inputValidation: boolean | null;
    inputFilled: boolean | null;
  }
  interface BankInfoStates {
    accountHolderNameDetails: inputValueState;
    bankNameDetails: inputValueState;
    bankAccountNumberDetails: inputValueState;
    branchNameDetails: inputValueState;
    branchAddressDetails: inputValueState;
  }
  const [bankInfoDetails, setBankInfoDetails] = useState<BankInfoStates>({
    accountHolderNameDetails: {
      inputValue: "",
      inputValidation: null,
      inputFilled: null,
    },
    bankNameDetails: {
      inputValue: "",
      inputValidation: null,
      inputFilled: null,
    },
    bankAccountNumberDetails: {
      inputValue: "",
      inputValidation: null,
      inputFilled: null,
    },
    branchNameDetails: {
      inputValue: "",
      inputValidation: null,
      inputFilled: null,
    },
    branchAddressDetails: {
      inputValue: "",
      inputValidation: null,
      inputFilled: null,
    },
  });

  const [selected, setSelected] = useState(false);

  //定义函数
  const debounceFunction = <T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  const validateInputEvent = (value: string, name: keyof BankInfoStates) => {
    if (value.length > 0) {
      setBankInfoDetails((prev) => {
        return {
          ...prev,
          [name]: {
            ...prev[name],
            inputFilled: true,
          },
        };
      });
      if (
        value.length > inputValidationConfig[name].minLength &&
        value.length < inputValidationConfig[name].maxLength &&
        inputValidationConfig[name].regex.test(value)
      ) {
        setBankInfoDetails((prev) => {
          return {
            ...prev,
            [name]: {
              ...prev[name],
              inputValue: value,
              inputValidation: true,
              inputFilled: true,
            },
          };
        });
        sessionStorage.setItem(name, JSON.stringify(value));
      }
    } else {
      setBankInfoDetails((prev) => {
        return {
          ...prev,
          [name]: {
            ...prev[name],
            inputValue: value,
            inputValidation: false,
            inputFilled: true,
          },
        };
      });
      sessionStorage.removeItem(name);
    }
  };
  const handleBankInfoOnChange = () => {};
  // const validateInputEvent = (
  //   minlength: number,
  //   maxlength: number,
  //   regex: RegExp
  // ) => {
  //   return (value: string, name: string) => {
  //     switch (name) {
  //       case "AccountHolderName":
  //         if (value.length > 0) {
  //           if (
  //             value.length >= minlength &&
  //             value.length <= maxlength &&
  //             regex.test(value)
  //           ) {
  //             setAccountHolderNameDetails({
  //               accountHolderNameInputFilled: true,
  //               accountHolderNameValidation: true,
  //             });
  //             // 存储前对value进行JSON格式化处理
  //             sessionStorage.setItem(
  //               "accountHolderName",
  //               JSON.stringify(value)
  //             );
  //           } else {
  //             setAccountHolderNameDetails({
  //               accountHolderNameInputFilled: true,
  //               accountHolderNameValidation: false,
  //             });
  //             sessionStorage.removeItem("accountHolderName");
  //           }
  //         } else {
  //           setAccountHolderNameDetails({
  //             accountHolderNameValidation: false,
  //             accountHolderNameInputFilled: false,
  //           });
  //           sessionStorage.removeItem("accountHolderName");
  //         }
  //         break;
  //       case "BankName":
  //         if (value.length > 0) {
  //           if (
  //             value.length >= minlength &&
  //             value.length <= maxlength &&
  //             regex.test(value)
  //           ) {
  //             setBankNameDetails({
  //               bankNameInputFilled: true,
  //               bankNameValidation: true,
  //             });
  //             // 存储前对value进行JSON格式化处理
  //             sessionStorage.setItem("bankName", JSON.stringify(value));
  //           } else {
  //             setBankNameDetails({
  //               bankNameInputFilled: true,
  //               bankNameValidation: false,
  //             });
  //             sessionStorage.removeItem("bankName");
  //           }
  //         } else {
  //           setBankNameDetails({
  //             bankNameValidation: false,
  //             bankNameInputFilled: false,
  //           });
  //           sessionStorage.removeItem("bankName");
  //         }
  //         break;
  //       case "BankAccountNumber":
  //         if (value.length > 0) {
  //           if (
  //             value.length >= minlength &&
  //             value.length <= maxlength &&
  //             regex.test(value)
  //           ) {
  //             setBankAccountNumberDetails({
  //               bankAccountNumberInputFilled: true,
  //               bankAccountNumberValidation: true,
  //             });
  //             // 存储前对value进行JSON格式化处理
  //             sessionStorage.setItem(
  //               "bankAccountNumber",
  //               JSON.stringify(value)
  //             );
  //           } else {
  //             setBankAccountNumberDetails({
  //               bankAccountNumberInputFilled: true,
  //               bankAccountNumberValidation: false,
  //             });
  //             sessionStorage.removeItem("bankAccountNumber");
  //           }
  //         } else {
  //           setBankAccountNumberDetails({
  //             bankAccountNumberValidation: false,
  //             bankAccountNumberInputFilled: false,
  //           });
  //           sessionStorage.removeItem("bankAccountNumber");
  //         }
  //         break;
  //       case "BranchName":
  //         if (value.length > 0) {
  //           if (
  //             value.length >= minlength &&
  //             value.length <= maxlength &&
  //             regex.test(value)
  //           ) {
  //             setBranchNameDetails({
  //               branchNameInputFilled: true,
  //               branchNameValidation: true,
  //             });
  //             sessionStorage.setItem("branchName", JSON.stringify(value));
  //           } else {
  //             setBranchNameDetails({
  //               branchNameInputFilled: true,
  //               branchNameValidation: false,
  //             });
  //             sessionStorage.removeItem("branchName");
  //           }
  //         } else {
  //           setBranchNameDetails({
  //             branchNameValidation: false,
  //             branchNameInputFilled: true,
  //           });
  //           sessionStorage.removeItem("branchName");
  //         }
  //         break;
  //       case "BranchAddress":
  //         if (value.length > 0) {
  //           if (
  //             value.length >= minlength &&
  //             value.length <= maxlength &&
  //             regex.test(value)
  //           ) {
  //             setBranchAddressDetails({
  //               branchAddressInputFilled: true,
  //               branchAddressValidation: true,
  //             });
  //             sessionStorage.setItem("branchAddress", JSON.stringify(value));
  //           } else {
  //             setBranchAddressDetails({
  //               branchAddressInputFilled: true,
  //               branchAddressValidation: false,
  //             });
  //             sessionStorage.removeItem("branchAddress");
  //           }
  //         } else {
  //           setBranchAddressDetails({
  //             branchAddressValidation: false,
  //             branchAddressInputFilled: true,
  //           });
  //           sessionStorage.removeItem("branchAddress");
  //         }
  //     }
  //   };
  // };

  // 修改后：新增
  // const handleAccountHolderNameChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = e.target.value;
  //   setAccountHolderNameInputValue(value); // 实时更新输入值
  //   debounceFunction(
  //     validateInputEvent(
  //       inputValidationConfig.AccountHolderName.minLength,
  //       inputValidationConfig.AccountHolderName.maxLength,
  //       inputValidationConfig.AccountHolderName.regex
  //     ),
  //     150 // 降低延迟
  //   )(value, "AccountHolderName");
  // };
  // // 新增
  // const handleBranchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setBranchNameInputValue(value); // 实时更新输入值
  //   debounceFunction(
  //     validateInputEvent(
  //       inputValidationConfig.BranchName.minLength,
  //       inputValidationConfig.BranchName.maxLength,
  //       inputValidationConfig.BranchName.regex
  //     ),
  //     150 // 降低延迟
  //   )(value, "BranchName");
  // };
  // // 新增
  // const handleBranchAddressChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = e.target.value;
  //   setBranchAddressInputValue(value); // 实时更新输入值
  //   debounceFunction(
  //     validateInputEvent(
  //       inputValidationConfig.BranchAddress.minLength,
  //       inputValidationConfig.BranchAddress.maxLength,
  //       inputValidationConfig.BranchAddress.regex
  //     ),
  //     150 // 降低延迟
  //   )(value, "BranchAddress");
  // };
  // // 新增
  // const handleBankAccountNumberChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const value = e.target.value;
  //   setBankAccountNumberInputValue(value); // 实时更新输入值
  //   debounceFunction(
  //     validateInputEvent(
  //       inputValidationConfig.BankAccountNumber.minLength,
  //       inputValidationConfig.BankAccountNumber.maxLength,
  //       inputValidationConfig.BankAccountNumber.regex
  //     ),
  //     150 // 降低延迟
  //   )(value, "BankAccountNumber");
  // };
  // // 新增
  // const handleBankNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setBankNameInputValue(value); // 实时更新输入值
  //   debounceFunction(
  //     validateInputEvent(
  //       inputValidationConfig.BankName.minLength,
  //       inputValidationConfig.BankName.maxLength,
  //       inputValidationConfig.BankName.regex
  //     ),
  //     150 // 降低延迟
  //   )(value, "BankName");
  // };

  // const onClick = () => {
  //   setSelected(!selected);
  // };
  // useEffect(() => {
  //   const validations = [
  //     accountHolderNameDetails.accountHolderNameValidation,
  //     bankNameDetails.bankNameValidation,
  //     bankAccountNumberDetails.bankAccountNumberValidation,
  //     branchNameDetails.branchNameValidation,
  //     branchAddressDetails.branchAddressValidation,
  //   ];
  //   const allFieldsValid = validations.every((v) => v === true);
  //   setIsBankInfoValid(allFieldsValid&&selected);
  // }, [
  //   accountHolderNameDetails,
  //   bankNameDetails,
  //   bankAccountNumberDetails,
  //   branchNameDetails,
  //   branchAddressDetails,
  //   selected,
  //   setIsBankInfoValid,
  // ]);
  // useEffect(() => {
  //   const savedValue = sessionStorage.getItem("accountHolderName");
  //   if (savedValue !== null) {
  //     const value = JSON.parse(savedValue);
  //     setAccountHolderNameInputValue(value);
  //     // 触发初始验证
  //     validateInputEvent(
  //       inputValidationConfig.AccountHolderName.minLength,
  //       inputValidationConfig.AccountHolderName.maxLength,
  //       inputValidationConfig.AccountHolderName.regex
  //     )(value, "AccountHolderName");
  //   }
  // }, []);
  // useEffect(() => {
  //   const savedValue = sessionStorage.getItem("bankName");
  //   if (savedValue !== null) {
  //     const value = JSON.parse(savedValue);
  //     setBankNameInputValue(value);
  //     // 触发初始验证
  //     validateInputEvent(
  //       inputValidationConfig.BankName.minLength,
  //       inputValidationConfig.BankName.maxLength,
  //       inputValidationConfig.BankName.regex
  //     )(value, "BankName");
  //   }
  // }, []);
  // useEffect(() => {
  //   const savedValue = sessionStorage.getItem("bankAccountNumber");
  //   if (savedValue !== null) {
  //     const value = JSON.parse(savedValue);
  //     setBankAccountNumberInputValue(value);
  //     // 触发初始验证
  //     validateInputEvent(
  //       inputValidationConfig.BankAccountNumber.minLength,
  //       inputValidationConfig.BankAccountNumber.maxLength,
  //       inputValidationConfig.BankAccountNumber.regex
  //     )(value, "BankAccountNumber");
  //   }
  // }, []);
  // useEffect(() => {
  //   const savedValue = sessionStorage.getItem("branchName");
  //   if (savedValue !== null) {
  //     const value = JSON.parse(savedValue);
  //     setBranchNameInputValue(value);
  //     // 触发初始验证
  //     validateInputEvent(
  //       inputValidationConfig.BranchName.minLength,
  //       inputValidationConfig.BranchName.maxLength,
  //       inputValidationConfig.BranchName.regex
  //     )(value, "BranchName");
  //   }
  // }, []);
  // useEffect(() => {
  //   const savedValue = sessionStorage.getItem("branchAddress");
  //   if (savedValue !== null) {
  //     const value = JSON.parse(savedValue);
  //     setBranchAddressInputValue(value);
  //     // 触发初始验证
  //     validateInputEvent(
  //       inputValidationConfig.BranchAddress.minLength,
  //       inputValidationConfig.BranchAddress.maxLength,
  //       inputValidationConfig.BranchAddress.regex
  //     )(value, "BranchAddress");
  //   }
  // }, []);

  //定义输入验证接口
  interface ValidationConfig {
    minLength: number;
    maxLength: number;
    regex: RegExp;
  }
  //定义输入验证配置
  const inputValidationConfig: Record<string, ValidationConfig> = {
    accountHolderName: {
      minLength: 2,
      maxLength: 50,
      regex: /^[\p{L}\s'-]+$/u,
    },
    bankName: {
      minLength: 2,
      maxLength: 100,
      regex: /^[\p{L}\d\s()-]+$/u,
    },
    bankAccountNumber: {
      minLength: 8,
      maxLength: 34,
      regex: /^[\d\s-]+$/u,
    },
    branchName: {
      minLength: 2,
      maxLength: 100,
      regex: /^[\p{L}\d\s()-]+$/u,
    },
    branchAddress: {
      minLength: 5,
      maxLength: 200,
      regex: /^[\p{L}\d\s,.-]+$/u,
    },
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
            name="accountHolderName"
            value={accountHolderNameInputValue}
            onChange={handleAccountHolderNameChange}
          />
          {!accountHolderNameDetails.accountHolderNameValidation &&
            accountHolderNameDetails.accountHolderNameInputFilled && (
              <h4 className="text-red-700 pl-3">请正确输入2~50长度的字符串</h4>
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
            name="bankName"
            value={bankNameInputValue}
            onChange={handleBankNameChange}
          />
          {!bankNameDetails.bankNameValidation &&
            bankNameDetails.bankNameInputFilled && (
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
            name="bankAccountNumber"
            value={bankAccountNumberInputValue}
            onChange={handleBankAccountNumberChange}
          />
          {!bankAccountNumberDetails.bankAccountNumberValidation &&
            bankAccountNumberDetails.bankAccountNumberInputFilled && (
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
            name="branchName"
            value={branchNameInputValue}
            onChange={handleBranchNameChange}
          />
          {!branchNameDetails.branchNameValidation &&
            branchNameDetails.branchNameInputFilled && (
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
            name="branchAddress"
            value={branchAddressInputValue}
            onChange={handleBranchAddressChange}
          />
          {!branchAddressDetails.branchAddressValidation &&
            branchAddressDetails.branchAddressInputFilled && (
              <h4 className="text-red-700 pl-3">请正确输入</h4>
            )}
        </div>
      </div>
      <UploadCard item={{ name: "First page savings book" }} />
      <div className="w-full  flex justify-start items-center py-2">
        <div
          className={`w-4 h-4 border rounded-full relative mr-2 select-none ${
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
