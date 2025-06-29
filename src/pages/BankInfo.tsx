import React, { useEffect, useState } from "react";
import useQuestionnaireContext from "hooks/useQuestionnaireContext";
import UploadCard from "components/ui/uploadCard";

export default function BankInfo() {
  const inputStyle =
    "w-10/12 border border-gray-900 rounded-2xl ml-2 pl-2 h-8 bg-gray-100";
  const debounceFunction = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: []) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const [thirdValidationState, setThirdValidationState] = useState({
    AccountHolderName: false,
    BankName: false,
    BankAccountNumber: false,
    BranchName: false,
    BranchAddress: false,
  });
  const [inputValue, setInputValue] = useState({
    AccountHolderName: "",
    BankName: "",
    BankAccountNumber: "",
    BranchName: "",
    BranchAddress: "",
  });

  const [accountHolderNameDetails, setAccountHolderNameDetails] = useState<{
    accountHolderNameValidation: boolean | null;
    accountHolderNameInputFilled: boolean | null;
  }>({
    accountHolderNameValidation: null,
    accountHolderNameInputFilled: null,
  });

  const [bankNameDetails, setBankNameDetails] = useState<{
    bankNameValidation: boolean | null;
    bankNameInputFilled: boolean | null;
  }>({
    bankNameValidation: null,
    bankNameInputFilled: null,
  });
  const [bankAccountNumberDetails, setBankAccountNumberDetails] = useState<{
    bankAccountNumberValidation: boolean | null;
    bankAccountNumberInputFilled: boolean | null;
  }>({
    bankAccountNumberValidation: null,
    bankAccountNumberInputFilled: null,
  });

  const [branchNameDetails, setBranchNameDetails] = useState<{
    branchNameValidation: boolean | null;
    branchNameInputFilled: boolean | null;
  }>({
    branchNameValidation: null,
    branchNameInputFilled: null,
  });

  const [branchAddressDetails, setBranchAddressDetails] = useState<{
    branchAddressValidation: boolean | null;
    branchAddressInputFilled: boolean | null;
  }>({
    branchAddressValidation: null,
    branchAddressInputFilled: null,
  });

  const updateInputValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;
    const newInputValue = { ...inputValue, [name]: value };
    setInputValue(newInputValue);
    console.log(newInputValue);
    const newThirdValidationState = { ...thirdValidationState, [name]: true };
    setThirdValidationState(newThirdValidationState);
  };
  const validateInputEvent = (
    minlength: number,
    maxlength: number,
    regex: RegExp
  ) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const name = event.target.name;

      switch (event.target.name) {
        case "AccountHolderName":
          if (event.target.value.length > 0) {
            if (
              value.length >= minlength &&
              value.length <= maxlength &&
              regex.test(value)
            ) {
              setAccountHolderNameDetails({
                ...accountHolderNameDetails,
                accountHolderNameValidation: true,
              });
            } else {
              setAccountHolderNameDetails({
                ...accountHolderNameDetails,
                accountHolderNameValidation: false,
              });
            }
            setAccountHolderNameDetails({
              ...accountHolderNameDetails,
              accountHolderNameInputFilled: true,
            });
          } else {
            setAccountHolderNameDetails({
              ...accountHolderNameDetails,
              accountHolderNameInputFilled: false,
            });
          }
          break;
        case "BankName":
          if (event.target.value.length > 0) {
            if (
              value.length >= minlength &&
              value.length <= maxlength &&
              regex.test(value)
            ) {
              setBankNameDetails({
                ...bankNameDetails,
                bankNameValidation: true,
              });
            } else {
              setBankNameDetails({
                ...bankNameDetails,
                bankNameValidation: false,
              });
            }
            setBankNameDetails({
              ...bankNameDetails,
              bankNameInputFilled: true,
            });
          } else {
            setBankNameDetails({
              ...bankNameDetails,
              bankNameInputFilled: false,
            });
          }
          break;
        case "BankAccountNumber":
          if (event.target.value.length > 0) {
            if (
              value.length >= minlength &&
              value.length <= maxlength &&
              regex.test(value)
            ) {
              setBankAccountNumberDetails({
                ...bankAccountNumberDetails,
                bankAccountNumberValidation: true,
              });
            } else {
              setBankAccountNumberDetails({
                ...bankAccountNumberDetails,
                bankAccountNumberValidation: false,
              });
            }
            setBankAccountNumberDetails({
              ...bankAccountNumberDetails,
              bankAccountNumberInputFilled: true,
            });
          } else {
            setBankAccountNumberDetails({
              ...bankAccountNumberDetails,
              bankAccountNumberInputFilled: false,
            });
          }
          break;
        case "BranchName":
          if (event.target.value.length > 0) {
            if (
              value.length >= minlength &&
              value.length <= maxlength &&
              regex.test(value)
            ) {
              setBranchNameDetails({
                ...branchNameDetails,
                branchNameValidation: true,
              });
            } else {
              setBranchNameDetails({
                ...branchNameDetails,
                branchNameValidation: false,
              });
            }
            setBranchNameDetails({
              ...branchNameDetails,
              branchNameInputFilled: false,
            });
          } else {
            setBranchNameDetails({
              ...branchNameDetails,
              branchNameInputFilled: true,
            });
          }
          break;
        case "BranchAddress":
          if (event.target.value.length > 0) {
            if (
              value.length >= minlength &&
              value.length <= maxlength &&
              regex.test(value)
            ) {
              setBranchAddressDetails({
                ...branchAddressDetails,
                branchAddressValidation: true,
              });
            } else {
              setBranchAddressDetails({
                ...branchAddressDetails,
                branchAddressValidation: false,
              });
            }
            setBranchAddressDetails({
              ...branchAddressDetails,
              branchAddressInputFilled: false,
            });
          } else {
            setBranchAddressDetails({
              ...branchAddressDetails,
              branchAddressInputFilled: true,
            });
          }
      }
    };
  };

  interface ValidationConfig {
    minLength: number;
    maxLength: number;
    regex: RegExp;
  }
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
          {!thirdValidationState.AccountHolderName &&
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
          {!thirdValidationState.BankName &&
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
          {!thirdValidationState.BankAccountNumber &&
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
          {!thirdValidationState.BranchName &&
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
          {!thirdValidationState.BranchAddress &&
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
