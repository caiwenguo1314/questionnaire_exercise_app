import UploadCard from "components/ui/uploadCard";
import React, { useCallback, useEffect, useMemo, useState, memo } from "react";

//定义输入验证接口
interface ValidationConfig {
  minLength: number;
  maxLength: number;
  regex: RegExp;
  errorMessage: string;
}

//定义输入状态接口
interface inputValueState {
  inputValue: string;
  inputValidation: boolean | null;
  inputFilled: boolean | null;
}

//定义表单状态接口
interface BankInfoStates {
  accountHolderNameDetails: inputValueState;
  bankNameDetails: inputValueState;
  bankAccountNumberDetails: inputValueState;
  branchNameDetails: inputValueState;
  branchAddressDetails: inputValueState;
}

//定义输入字段配置接口
interface FieldConfig {
  key: keyof BankInfoStates;
  label: string;
  placeholder: string;
  required: boolean;
  validation: ValidationConfig;
}

// 创建一个可重用的输入字段组件
const InputField = memo(({ 
  field, 
  value, 
  isValid, 
  isFilled, 
  onChange, 
  getInputStyle 
}: { 
  field: FieldConfig; 
  value: string; 
  isValid: boolean | null; 
  isFilled: boolean | null; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  getInputStyle: (isValid: boolean | null, isFilled: boolean | null) => string; 
}) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          name={String(field.key)}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
          className={getInputStyle(isValid, isFilled)}
        />
        {isFilled && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isValid ? (
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
      {!isValid && isFilled && (
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
          <p className="text-sm text-red-600">{field.validation.errorMessage}</p>
        </div>
      )}
    </div>
  );
});


// 更新组件接口，添加新的 props
export default function BankInfo({
  setIsBankInfoValid,
  selectedUserIndex,
  bankInfoData, // 新增
  updateBankInfoData, // 新增
}: {
  setIsBankInfoValid: (isValid: boolean) => void;
  selectedUserIndex: number | null;
  bankInfoData: {
    accountHolderNameDetails?: string;
    bankNameDetails?: string;
    bankAccountNumberDetails?: string;
    branchNameDetails?: string;
    branchAddressDetails?: string;

  };
  updateBankInfoData: (field: string, value: any) => void;
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


  const [selected, setSelected] = useState(false);

  // 保存条款同意状态到 sessionStorage
  useEffect(() => {
    if (selectedUserIndex !== null) {
      const storageKey = `${selectedUserIndex}_termsAgreed`;
      sessionStorage.setItem(storageKey, JSON.stringify(selected));
    }
  }, [selected, selectedUserIndex]);

  // 从 sessionStorage 恢复条款同意状态
  useEffect(() => {
    if (selectedUserIndex !== null) {
      const storageKey = `${selectedUserIndex}_termsAgreed`;
      const savedValue = sessionStorage.getItem(storageKey);
      if (savedValue !== null) {
        try {
          const value = JSON.parse(savedValue);
          setSelected(value);
        } catch (error) {
          console.error('Error parsing saved terms agreement:', error);
        }
      }
    }
  }, [selectedUserIndex]);

  //定义函数
  const debounceFunction = <T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ) => {
    let timer: NodeJS.Timeout;
    let lastArgs: Parameters<T>;
    let lastCallTime: number;

    return (...args: Parameters<T>) => {
      lastArgs = args;
      const now = Date.now();

      // 如果是第一次调用或者距离上次调用超过了延迟时间，立即执行
      if (!lastCallTime || (now - lastCallTime) >= delay) {
        lastCallTime = now;
        fn(...args);
        return;
      }

      // 否则使用防抖
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastCallTime = Date.now();
        fn(...lastArgs);
      }, Math.max(delay - (now - lastCallTime), 16));
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

  // 创建初始化函数
  const initializeField = useCallback((fieldKey: keyof BankInfoStates, value: string | undefined) => {
    const fieldConfig = fieldConfigs.find(field => field.key === fieldKey);
    if (!value || !fieldConfig) {
      return {
        inputValue: value || "",
        inputValidation: null,
        inputFilled: value ? true : null,
      };
    }
    
    // 如果有值，立即验证
    const isValid = value.length >= fieldConfig.validation.minLength &&
                   value.length <= fieldConfig.validation.maxLength &&
                   fieldConfig.validation.regex.test(value);
    
    return {
      inputValue: value,
      inputValidation: isValid,
      inputFilled: true,
    };
  }, [fieldConfigs]);

  // 初始化银行信息状态，使用 props 中的数据
  const [bankInfoDetails, setBankInfoDetails] = useState<BankInfoStates>(() => {
    return {
      accountHolderNameDetails: {
        inputValue: bankInfoData.accountHolderNameDetails || "",
        inputValidation: null,
        inputFilled: bankInfoData.accountHolderNameDetails ? true : null,
      },
      bankNameDetails: {
        inputValue: bankInfoData.bankNameDetails || "",
        inputValidation: null,
        inputFilled: bankInfoData.bankNameDetails ? true : null,
      },
      bankAccountNumberDetails: {
        inputValue: bankInfoData.bankAccountNumberDetails || "",
        inputValidation: null,
        inputFilled: bankInfoData.bankAccountNumberDetails ? true : null,
      },
      branchNameDetails: {
        inputValue: bankInfoData.branchNameDetails || "",
        inputValidation: null,
        inputFilled: bankInfoData.branchNameDetails ? true : null,
      },
      branchAddressDetails: {
        inputValue: bankInfoData.branchAddressDetails || "",
        inputValidation: null,
        inputFilled: bankInfoData.branchAddressDetails ? true : null,
      },
    };
  });

  // 初始化验证状态
  useEffect(() => {
    if (bankInfoData && Object.keys(bankInfoData).length > 0) {
      const newState = { ...bankInfoDetails };
      let hasChanges = false;

      Object.keys(bankInfoData).forEach((key) => {
        const fieldKey = key as keyof BankInfoStates;
        const value = bankInfoData[fieldKey];
        if (value && newState[fieldKey]) {
          const initializedField = initializeField(fieldKey, value);
          if (initializedField.inputValidation !== newState[fieldKey].inputValidation) {
            newState[fieldKey] = initializedField;
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        setBankInfoDetails(newState);
      }
    }
  }, [bankInfoData, initializeField]);

  // 修改验证函数，使用 updateBankInfoData 而不是 sessionStorage
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
          // 使用 updateBankInfoData 替代 sessionStorage
          updateBankInfoData(name, value);
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
          // 无效数据，可以选择不更新或设置为 null
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
        // 空值，可以选择不更新或设置为 null
      }
    },
    [fieldConfigs, updateBankInfoData]
  );

  const debouncedValidateInput = useMemo(
    () => debounceFunction(validateInputEvent, 50),
    [validateInputEvent]
  );

  const handleBankInfoOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      // 立即更新输入值，但延迟验证
      setBankInfoDetails((prev) => ({
        ...prev,
        [name]: {
          ...prev[name as keyof BankInfoStates],
          inputValue: value,
        },
      }));
      debouncedValidateInput(value, name as keyof BankInfoStates);
    },
    [debouncedValidateInput]
  );

  const onClick = () => {
    setSelected(!selected);
  };


  // 监听表单验证状态
  useEffect(() => {
    const requiredFields = fieldConfigs.filter((field) => field.required);
    const allRequiredFieldsValid = requiredFields.every(
      (field) => {
        const fieldState = bankInfoDetails[field.key];
        return fieldState.inputValidation === true && fieldState.inputFilled === true;
      }
    );
    
    // 检查非必填字段：如果有值则必须有效，如果没有值则忽略
    const optionalFields = fieldConfigs.filter((field) => !field.required);
    const allOptionalFieldsValid = optionalFields.every(
      (field) => {
        const fieldState = bankInfoDetails[field.key];
        // 如果字段为空或未填写，则认为有效
        if (!fieldState.inputFilled || !fieldState.inputValue || fieldState.inputValue.trim() === '') {
          return true;
        }
        // 如果有值，则必须验证通过
        return fieldState.inputValidation === true;
      }
    );

    const isFormValid = allRequiredFieldsValid && allOptionalFieldsValid && selected;
    
    // 添加调试日志
    console.log('Form validation:', {
      allRequiredFieldsValid,
      allOptionalFieldsValid,
      selected,
      isFormValid,
      bankInfoDetails: Object.keys(bankInfoDetails).reduce((acc, key) => {
        const field = bankInfoDetails[key as keyof BankInfoStates];
        acc[key] = {
          value: field.inputValue,
          validation: field.inputValidation,
          filled: field.inputFilled
        };
        return acc;
      }, {} as any)
    });

    setIsBankInfoValid(isFormValid);
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
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 bg-white min-h-screen">
      {/* 页面标题区域 */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
          Add New Payout Account
        </h1>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
          <p className="text-xs sm:text-sm text-gray-700 mb-1">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
        {fieldConfigs.map((field) => (
          <InputField
            key={field.key}
            field={field}
            value={bankInfoDetails[field.key].inputValue}
            isValid={bankInfoDetails[field.key].inputValidation}
            isFilled={bankInfoDetails[field.key].inputFilled}
            onChange={handleBankInfoOnChange}
            getInputStyle={getInputStyle}
          />
        ))}
      </div>

      {/* 文件上传区域 */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-2 sm:mb-3">
          Required Documents
        </h3>
        <div className="bg-gray-50 p-3 rounded-md">
          <UploadCard item={{ name: "First page savings book" }} />

        </div>
      </div>

      {/* 条款同意区域 */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-3 sm:p-4">
        <div className="flex items-start space-x-2 sm:space-x-3">
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
