import UploadCard from "components/ui/uploadCard";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export default function BankInfo({
  setIsBankInfoValid,
  selectedUserIndex,
}: {
  setIsBankInfoValid: (isValid: boolean) => void;
  selectedUserIndex: number | null;
}) {
  //定义输入框样式
  const getInputStyle = (isValid: boolean | null, isFilled: boolean | null) => {
    const baseStyle =
      "w-full px-3 py-2.5 border-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm";

    if (isFilled && isValid === false) {
      return `${baseStyle} border-red-400 bg-red-50 focus:ring-red-500`;
    } else if (isFilled && isValid === true) {
      return `${baseStyle} border-green-400 bg-green-50 focus:ring-green-500`;
    } else {
      return `${baseStyle} border-gray-300 bg-white hover:border-gray-400`;
    }
  };

  //定义接口
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

  //定义输入验证接口
  interface ValidationConfig {
    minLength: number;
    maxLength: number;
    regex: RegExp;
    errorMessage: string;
  }

  //定义输入字段配置
  interface FieldConfig {
    key: keyof BankInfoStates;
    label: string;
    placeholder: string;
    required: boolean;
    validation: ValidationConfig;
  }

  //定义输入字段配置数组
  const fieldConfigs: FieldConfig[] = useMemo(
    () => [
      {
        key: "accountHolderNameDetails",
        label: "Account holder's name",
        placeholder: "Enter bank account holder name",
        required: true,
        validation: {
          minLength: 2,
          maxLength: 50,
          regex: /^[\p{L}\s'-]+$/u,
          errorMessage:
            "请输入2-50个字符的姓名，只能包含字母、空格、撇号和连字符",
        },
      },
      {
        key: "bankNameDetails",
        label: "Bank name",
        placeholder: "Bank name",
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
          regex: /^[\p{L}\d\s()-]+$/u,
          errorMessage:
            "请输入2-100个字符的银行名称，只能包含字母、数字、空格、括号和连字符",
        },
      },
      {
        key: "bankAccountNumberDetails",
        label: "Bank account number",
        placeholder: "Enter bank account number",
        required: true,
        validation: {
          minLength: 8,
          maxLength: 34,
          regex: /^[\d\s-]+$/u,
          errorMessage: "请输入8-34位的银行账号，只能包含数字、空格和连字符",
        },
      },
      {
        key: "branchNameDetails",
        label: "Branch name",
        placeholder: "Enter branch name",
        required: false,
        validation: {
          minLength: 2,
          maxLength: 100,
          regex: /^[\p{L}\d\s()-]+$/u,
          errorMessage:
            "请输入2-100个字符的分行名称，只能包含字母、数字、空格、括号和连字符",
        },
      },
      {
        key: "branchAddressDetails",
        label: "Branch address",
        placeholder: "Branch address",
        required: false,
        validation: {
          minLength: 5,
          maxLength: 200,
          regex: /^[\p{L}\d\s,.-]+$/u,
          errorMessage:
            "请输入5-200个字符的分行地址，只能包含字母、数字、空格、逗号、句号和连字符",
        },
      },
    ],
    []
  );
  const validateInputEvent = useCallback(
    (value: string, name: keyof BankInfoStates) => {
      const config = fieldConfigs.find(
        (field) => field.key === name
      )?.validation;
      if (!config) return;

      if (value.length > 0) {
        setBankInfoDetails((prev) => {
          return {
            ...prev,
            [name]: {
              ...prev[name],
              inputValue: value,
              inputFilled: true,
            },
          };
        });
        if (
          value.length >= config.minLength &&
          value.length <= config.maxLength &&
          config.regex.test(value)
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
          const storageKey = selectedUserIndex !== null ? `${selectedUserIndex}_${name}` : name;
          sessionStorage.setItem(storageKey, JSON.stringify(value));
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
          const storageKey = selectedUserIndex !== null ? `${selectedUserIndex}_${name}` : name;
          sessionStorage.removeItem(storageKey);
        }
      } else {
        setBankInfoDetails((prev) => {
          return {
            ...prev,
            [name]: {
              ...prev[name],
              inputValue: value,
              inputValidation: false,
              inputFilled: false,
            },
          };
        });
        const storageKey = selectedUserIndex !== null ? `${selectedUserIndex}_${name}` : name;
        sessionStorage.removeItem(storageKey);
      }
    },
    [fieldConfigs, selectedUserIndex]
  );

  const handleBankInfoOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debounceFunction(validateInputEvent, 150)(
      value,
      name as keyof BankInfoStates
    );
  };

  const onClick = () => {
    setSelected(!selected);
  };

  // 监听表单验证状态
  useEffect(() => {
    const requiredFields = fieldConfigs.filter((field) => field.required);
    const allRequiredFieldsValid = requiredFields.every(
      (field) => bankInfoDetails[field.key].inputValidation === true
    );
    const allFieldsValid = Object.values(bankInfoDetails).every(
      (field) => field.inputValidation === true
    );

    setIsBankInfoValid(allRequiredFieldsValid && allFieldsValid && selected);
  }, [bankInfoDetails, selected, setIsBankInfoValid, fieldConfigs]);

  // 从sessionStorage恢复数据
  useEffect(() => {
    if (selectedUserIndex !== null) {
      fieldConfigs.forEach((field) => {
        const storageKey = `${selectedUserIndex}_${field.key}`;
        const savedValue = sessionStorage.getItem(storageKey);
        if (savedValue !== null) {
          try {
            const value = JSON.parse(savedValue);
            validateInputEvent(value, field.key);
          } catch (error) {
            console.error(`Error parsing saved value for ${field.key}:`, error);
          }
        }
      });
    }
  }, [fieldConfigs, validateInputEvent, selectedUserIndex]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 bg-white min-h-screen">
      {/* 页面标题区域 */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Add New Payout Account
        </h1>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
          <p className="text-sm text-gray-700 mb-1">
            The bank will validate your information with the relevant
            documentation before any funds can be transferred to this bank
            account.
          </p>
          <p className="text-xs text-gray-600">
            All fields marked with{" "}
            <span className="text-red-500 font-semibold">*</span> are mandatory
          </p>
        </div>
      </div>

      {/* 表单区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        {fieldConfigs.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder={field.placeholder}
                title={field.label}
                className={getInputStyle(
                  bankInfoDetails[field.key].inputValidation,
                  bankInfoDetails[field.key].inputFilled
                )}
                name={field.key}
                value={bankInfoDetails[field.key].inputValue}
                onChange={handleBankInfoOnChange}
              />
              {/* 验证状态图标 */}
              {bankInfoDetails[field.key].inputFilled && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {bankInfoDetails[field.key].inputValidation === true ? (
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              )}
            </div>
            {/* 错误提示 */}
            {!bankInfoDetails[field.key].inputValidation &&
              bankInfoDetails[field.key].inputFilled && (
                <div className="flex items-start space-x-2">
                  <svg
                    className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-red-600">
                    {field.validation.errorMessage}
                  </p>
                </div>
              )}
          </div>
        ))}
      </div>

      {/* 文件上传区域 */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-800 mb-3">
          Required Documents
        </h3>
        <div className="bg-gray-50 p-3 rounded-md">
          <UploadCard item={{ name: "First page savings book" }} />
        </div>
      </div>

      {/* 条款同意区域 */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            <button
              type="button"
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                selected
                  ? "bg-blue-600 border-blue-600 hover:bg-blue-700"
                  : "border-gray-300 hover:border-gray-400 bg-white"
              }`}
              onClick={onClick}
            >
              {selected && (
                <svg
                  className="w-2.5 h-2.5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-700 leading-relaxed">
              I declare that I have read, understood and fully agreed to the{" "}
              <button className="text-blue-600 hover:text-blue-800 underline font-medium">
                Terms and Conditions
              </button>{" "}
              for adding the new payout account including the privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
