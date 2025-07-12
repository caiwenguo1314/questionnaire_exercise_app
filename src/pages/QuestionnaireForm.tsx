import { ExclamationCircleFilled } from "@ant-design/icons";
import BillComponent from "components/form/BillComponent";
import UploadCard from "components/ui/uploadCard";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface Insurance {
  insurancePiece: string;
  insuranceNumber: string;
}
export interface AssuredPerson {
  name: string;
  insurance: Insurance[];
}

interface InputFieldState {
  value: string;
  isValid: boolean | null;
  isFilled: boolean | null;
  errorMessage?: string;
}

// 表单状态接口
interface FormState {
  admissionDate: InputFieldState;
  dischargeDate: InputFieldState;
  hospitalName: InputFieldState;
  thirdPartyClaim: string | null;
}

export default function QuestionnaireForm({
  setIsQuestionnaireValid,
  selectedUserIndex,
  selectedCardData,
}: {
  setIsQuestionnaireValid?: (isValid: boolean) => void;
  selectedUserIndex: number | null;
  selectedCardData: AssuredPerson | null;
}) {
  // selectedCardData 现在通过 props 传入

  // 表单状态管理
  const [formState, setFormState] = useState<FormState>({
    admissionDate: { value: "", isValid: null, isFilled: null },
    dischargeDate: { value: "", isValid: null, isFilled: null },
    hospitalName: { value: "", isValid: null, isFilled: null },
    thirdPartyClaim: null,
  });

  const UploadCardsData = [
    { name: "Doctor's statement/Discharge summary", required: true },
    {
      name: "Original official receipt and breakdown of billing",
      required: true,
    },
    { name: "Personal identity card", required: true },
    {
      name: "Results and interpretation of laboratory and diagnostic tests",
      required: false,
    },
    { name: "Passport and/or boarding pass", required: false },
    { name: "Name change letter", required: false },
    { name: "Coordination of benefits from other insurance", required: false },
    { name: "Attachment of room prices in hospital", required: false },
    { name: "Other documents(if any)", required: false },
  ];

  // 输入框样式函数
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

  // 字段验证配置
  const fieldValidations = useMemo(
    () => ({
      admissionDate: { required: true, errorMessage: "请选择入院日期" },
      dischargeDate: { required: true, errorMessage: "请选择出院日期" },
      hospitalName: {
        required: true,
        errorMessage: "请输入医院/诊所名称，至少2个字符",
      },
    }),
    []
  );

  const [billsArray, setBillsArray] = useState<number[]>([1]);
  // 防抖函数
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

  // 验证输入字段
  const validateField = useCallback(
    (fieldName: keyof FormState, value: string) => {
      if (fieldName === "thirdPartyClaim") return;

      const validation =
        fieldValidations[fieldName as keyof typeof fieldValidations];
      if (!validation) return;

      let isValid = true;
      let errorMessage = validation.errorMessage;

      if (validation.required && value.trim().length === 0) {
        isValid = false;
      } else if (fieldName === "hospitalName" && value.trim().length < 2) {
        isValid = false;
      } else if (
        (fieldName === "admissionDate" || fieldName === "dischargeDate") &&
        value.trim().length === 0
      ) {
        isValid = false;
      }

      // 日期交叉验证：住院日期必须早于出院日期
      if (
        isValid &&
        (fieldName === "admissionDate" || fieldName === "dischargeDate")
      ) {
        const currentAdmissionDate =
          fieldName === "admissionDate" ? value : formState.admissionDate.value;
        const currentDischargeDate =
          fieldName === "dischargeDate" ? value : formState.dischargeDate.value;

        if (currentAdmissionDate && currentDischargeDate) {
          const admissionDate = new Date(currentAdmissionDate);
          const dischargeDate = new Date(currentDischargeDate);

          if (admissionDate >= dischargeDate) {
            isValid = false;
            if (fieldName === "admissionDate") {
              errorMessage = "入院日期必须早于出院日期";
            } else {
              errorMessage = "出院日期必须晚于入院日期";
            }
          }
        }
      }

      setFormState((prev) => ({
        ...prev,
        [fieldName]: {
          value,
          isValid,
          isFilled: value.trim().length > 0,
          errorMessage,
        },
      }));

      // 如果是日期字段，需要重新验证另一个日期字段（避免循环调用）
      if (
        fieldName === "admissionDate" &&
        formState.dischargeDate.value &&
        formState.dischargeDate.isFilled
      ) {
        // 直接更新另一个字段的验证状态，而不是重新调用validateField
        const otherDateValue = formState.dischargeDate.value;
        const admissionDate = new Date(value);
        const dischargeDate = new Date(otherDateValue);

        if (admissionDate >= dischargeDate) {
          setFormState((prev) => ({
            ...prev,
            dischargeDate: {
              ...prev.dischargeDate,
              isValid: false,
              errorMessage: "出院日期必须晚于入院日期",
            },
          }));
        } else if (
          !formState.dischargeDate.isValid &&
          formState.dischargeDate.errorMessage === "出院日期必须晚于入院日期"
        ) {
          // 如果之前因为日期冲突而无效，现在需要重新验证
          setFormState((prev) => ({
            ...prev,
            dischargeDate: {
              ...prev.dischargeDate,
              isValid: true,
              errorMessage: undefined,
            },
          }));
        }
      } else if (
        fieldName === "dischargeDate" &&
        formState.admissionDate.value &&
        formState.admissionDate.isFilled
      ) {
        // 直接更新另一个字段的验证状态，而不是重新调用validateField
        const otherDateValue = formState.admissionDate.value;
        const admissionDate = new Date(otherDateValue);
        const dischargeDate = new Date(value);

        if (admissionDate >= dischargeDate) {
          setFormState((prev) => ({
            ...prev,
            admissionDate: {
              ...prev.admissionDate,
              isValid: false,
              errorMessage: "入院日期必须早于出院日期",
            },
          }));
        } else if (
          !formState.admissionDate.isValid &&
          formState.admissionDate.errorMessage === "入院日期必须早于出院日期"
        ) {
          // 如果之前因为日期冲突而无效，现在需要重新验证
          setFormState((prev) => ({
            ...prev,
            admissionDate: {
              ...prev.admissionDate,
              isValid: true,
              errorMessage: undefined,
            },
          }));
        }
      }

      // 存储到sessionStorage
      if (isValid && value.trim().length > 0) {
        const storageKey =
          selectedUserIndex !== null
            ? `${selectedUserIndex}_questionnaire_${fieldName}`
            : `questionnaire_${fieldName}`;
        sessionStorage.setItem(storageKey, value);
      } else {
        const storageKey =
          selectedUserIndex !== null
            ? `${selectedUserIndex}_questionnaire_${fieldName}`
            : `questionnaire_${fieldName}`;
        sessionStorage.removeItem(storageKey);
      }
    },
    [
      fieldValidations,
      formState.admissionDate.value,
      formState.dischargeDate.value,
      formState.admissionDate.errorMessage,
      formState.admissionDate.isFilled,
      formState.admissionDate.isValid,
      formState.dischargeDate.errorMessage,
      formState.dischargeDate.isFilled,
      formState.dischargeDate.isValid,
      selectedUserIndex,
    ]
  );

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debounceFunction(validateField, 300)(name as keyof FormState, value);
  };

  // 处理第三方理赔选择
  const handleThirdPartyClaimChange = (value: string) => {
    setFormState((prev) => ({ ...prev, thirdPartyClaim: value }));
    const storageKey =
      selectedUserIndex !== null
        ? `${selectedUserIndex}_questionnaire_thirdPartyClaim`
        : "questionnaire_thirdPartyClaim";
    sessionStorage.setItem(storageKey, value);
  };

  const handleBillCurrent = () => {
    setBillsArray((prev) => {
      const newBill = prev.length + 1;
      const newBillsArray = [...prev, newBill];

      // 保存到sessionStorage
      if (selectedUserIndex !== null) {
        sessionStorage.setItem(
          `${selectedUserIndex}_billsArray`,
          JSON.stringify(newBillsArray)
        );
      }

      return newBillsArray;
    });
  };

  const handleDeleteBill = (billToDelete: number) => {
    setBillsArray((prev) => {
      // 确保至少保留一个BILL
      if (prev.length <= 1) {
        return prev;
      }
      const newBillsArray = prev.filter((bill) => bill !== billToDelete);

      // 保存到sessionStorage
      if (selectedUserIndex !== null) {
        sessionStorage.setItem(
          `${selectedUserIndex}_billsArray`,
          JSON.stringify(newBillsArray)
        );
      }

      return newBillsArray;
    });
  };

  // 监听表单验证状态
  useEffect(() => {
    const isFormValid = Boolean(
      formState.admissionDate.isValid === true &&
        formState.dischargeDate.isValid === true &&
        formState.hospitalName.isValid === true &&
        formState.thirdPartyClaim !== null
    );

    // 调试信息
    console.log("表单验证状态:", {
      admissionDate: formState.admissionDate.isValid,
      dischargeDate: formState.dischargeDate.isValid,
      hospitalName: formState.hospitalName.isValid,
      thirdPartyClaim: formState.thirdPartyClaim,
      isFormValid,
    });

    if (setIsQuestionnaireValid) {
      setIsQuestionnaireValid(isFormValid);
    }
  }, [formState, setIsQuestionnaireValid]);

  // 从sessionStorage恢复数据
  useEffect(() => {
    if (selectedUserIndex !== null) {
      const savedAdmissionDate = sessionStorage.getItem(
        `${selectedUserIndex}_questionnaire_admissionDate`
      );
      const savedDischargeDate = sessionStorage.getItem(
        `${selectedUserIndex}_questionnaire_dischargeDate`
      );
      const savedHospitalName = sessionStorage.getItem(
        `${selectedUserIndex}_questionnaire_hospitalName`
      );
      const savedThirdPartyClaim = sessionStorage.getItem(
        `${selectedUserIndex}_questionnaire_thirdPartyClaim`
      );

      if (savedAdmissionDate)
        validateField("admissionDate", savedAdmissionDate);
      if (savedDischargeDate)
        validateField("dischargeDate", savedDischargeDate);
      if (savedHospitalName) validateField("hospitalName", savedHospitalName);
      if (savedThirdPartyClaim) {
        setFormState((prev) => ({
          ...prev,
          thirdPartyClaim: savedThirdPartyClaim,
        }));
      }

      // 恢复billsArray数据
      const savedBillsArray = sessionStorage.getItem(
        `${selectedUserIndex}_billsArray`
      );
      if (savedBillsArray) {
        try {
          const billsData = JSON.parse(savedBillsArray);
          setBillsArray(billsData);
        } catch (error) {
          console.error("Error parsing saved bills array:", error);
        }
      }
    }
  }, [validateField, selectedUserIndex]);
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 bg-white min-h-screen">
      {/* 页面标题区域 */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Hospitalization Claim
        </h1>

        {/* Life Assured 信息 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-blue-800 mb-1">
            Life Assured
          </h3>
          <p className="text-lg font-semibold text-blue-900">
            {selectedCardData?.name || "Please select a life assured first"}
          </p>
        </div>
      </div>

      {/* Claim Details Section */}
      <div className="mb-8">
        <div className="border-t-2 border-gray-200 pt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Claim Details
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg mb-6">
            <p className="text-sm text-gray-700">
              Complete all mandatory fields marked with{" "}
              <span className="text-red-500 font-semibold">*</span>
            </p>
          </div>
        </div>
        {/* 表单输入区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* 入院日期 */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Admission date
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="admissionDate"
                value={formState.admissionDate.value}
                onChange={handleInputChange}
                className={getInputStyle(
                  formState.admissionDate.isValid,
                  formState.admissionDate.isFilled
                )}
              />
              {/* 验证状态图标 */}
              {formState.admissionDate.isFilled && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {formState.admissionDate.isValid === true ? (
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
            {!formState.admissionDate.isValid &&
              formState.admissionDate.isFilled && (
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
                    {formState.admissionDate.errorMessage ||
                      fieldValidations.admissionDate.errorMessage}
                  </p>
                </div>
              )}
          </div>

          {/* 出院日期 */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Discharge date
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="dischargeDate"
                value={formState.dischargeDate.value}
                onChange={handleInputChange}
                className={getInputStyle(
                  formState.dischargeDate.isValid,
                  formState.dischargeDate.isFilled
                )}
              />
              {/* 验证状态图标 */}
              {formState.dischargeDate.isFilled && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {formState.dischargeDate.isValid === true ? (
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
            {!formState.dischargeDate.isValid &&
              formState.dischargeDate.isFilled && (
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
                    {formState.dischargeDate.errorMessage ||
                      fieldValidations.dischargeDate.errorMessage}
                  </p>
                </div>
              )}
          </div>

          {/* 医院名称 */}
          <div className="space-y-1.5 lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Hospital/clinic name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="hospitalName"
                placeholder="Enter hospital or clinic name"
                value={formState.hospitalName.value}
                onChange={handleInputChange}
                className={getInputStyle(
                  formState.hospitalName.isValid,
                  formState.hospitalName.isFilled
                )}
              />
              {/* 验证状态图标 */}
              {formState.hospitalName.isFilled && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {formState.hospitalName.isValid === true ? (
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
            {!formState.hospitalName.isValid &&
              formState.hospitalName.isFilled && (
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
                    {formState.hospitalName.errorMessage ||
                      fieldValidations.hospitalName.errorMessage}
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* 第三方理赔确认区域 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div
          className={`border rounded-lg p-6 transition-all duration-200 ${
            formState.thirdPartyClaim !== null
              ? "bg-green-50 border-green-200"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-medium text-gray-800 mb-1">
                  Did you claim this medical expense from a third party?
                  <span className="text-red-500 ml-1">*</span>
                </h3>
                {formState.thirdPartyClaim !== null && (
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
                )}
              </div>
              <p className="text-xs text-gray-600">
                (e.g. insurers or employers)
              </p>
              {formState.thirdPartyClaim !== null && (
                <p className="text-xs text-green-700 mt-1 font-medium">
                  Selected: {formState.thirdPartyClaim === "yes" ? "Yes" : "No"}
                </p>
              )}
            </div>
            <div className="flex space-x-0 border border-gray-300 rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => handleThirdPartyClaimChange("yes")}
                className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${
                  formState.thirdPartyClaim === "yes"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleThirdPartyClaimChange("no")}
                className={`px-6 py-2 text-sm font-medium transition-all duration-200 border-l border-gray-300 ${
                  formState.thirdPartyClaim === "no"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 提示区域 */}
      <div className="mt-8">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <ExclamationCircleFilled className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-amber-800 font-medium mb-1">
                Important Notice
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Please ensure that you add bills and documents related to your
                hospitalization stay only. Please submit a new claim for all
                other items.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 添加账单区域 */}
      <div className="mt-10 pt-8 border-t-2 border-gray-200">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 space-y-6 border border-blue-100">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
              <svg
                className="w-6 h-6 mr-3 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Add Bills
            </h2>
            <p className="text-gray-600">
              Please provide details for all medical bills related to your claim
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg mt-4">
              <p className="text-sm text-gray-700">
                Complete all mandatory fields marked with{" "}
                <span className="text-red-500 font-semibold">*</span>
              </p>
            </div>
          </div>

          {/* 账单组件 */}
          <div className="space-y-6">
            {billsArray.map((item, index) => (
              <BillComponent
                key={item}
                billIndex={index}
                onDelete={handleDeleteBill}
                canDelete={billsArray.length > 1}
              />
            ))}
          </div>

          {/* 添加账单按钮 */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleBillCurrent}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add Another Medical Bill</span>
            </button>
          </div>
        </div>

        {/* 文档上传区域 */}
        <div className="mt-10 pt-8 border-t-2 border-gray-200">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Upload Documents
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-2">
                Please retain original copies of these documents for 6 months
                from submission, as you may be required to submit them upon
                request.
              </p>
              <p className="text-xs text-blue-700">
                All document types marked with{" "}
                <span className="text-red-500 font-semibold">*</span> are
                mandatory.
              </p>
            </div>
          </div>

          {/* 文档上传卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {UploadCardsData.map((item, index) => (
              <UploadCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
