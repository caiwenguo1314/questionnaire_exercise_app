import React from "react";
import { AssuredPerson } from "types/form";

export default function Review({
  selectedCardData,
  selectedUserIndex
}: {
  selectedCardData: AssuredPerson | null;
  selectedUserIndex: number | null;
}) {
  // 根据选中用户获取数据
  const getStorageValue = (key: string) => {
    if (selectedUserIndex === null) return null;
    return sessionStorage.getItem(`${selectedUserIndex}_${key}`);
  };
  
  const accountHolderNameValue = getStorageValue("accountHolderNameDetails");
  const bankNameValue = getStorageValue("bankNameDetails");
  const bankAccountNumberValue = getStorageValue("bankAccountNumberDetails");
  const branchNameValue = getStorageValue("branchNameDetails");
  const branchAddressValue = getStorageValue("branchAddressDetails");
  
  const admissionDateValue = getStorageValue("questionnaire_admissionDate");
  const dischargeDateValue = getStorageValue("questionnaire_dischargeDate");
  const hospitalNameValue = getStorageValue("questionnaire_hospitalName");
  const thirdPartyClaimValue = getStorageValue("questionnaire_thirdPartyClaim");
  
  // 解析JSON格式的银行信息数据
  const parseStorageValue = (value: string | null) => {
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Review Your Information</h1>
        <p className="text-gray-600">Please review all the information before submitting your claim.</p>
      </div>

      {/* 用户信息卡片 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Life Assured Information
        </h2>
        {selectedCardData ? (
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-4">{selectedCardData.name}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCardData.insurance.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="text-sm font-medium text-gray-600 mb-1">Policy</div>
                  <div className="text-sm text-gray-800 mb-2">{item.insurancePiece}</div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Policy Number</div>
                  <div className="text-sm font-mono text-gray-800">{item.insuranceNumber}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 italic">No user selected</div>
        )}
      </div>

      {/* 理赔详情 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Claim Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Admission Date</label>
              <div className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                {admissionDateValue || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Discharge Date</label>
              <div className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                {dischargeDateValue || "Not provided"}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Hospital/Clinic Name</label>
              <div className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                {hospitalNameValue || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Third Party Claim</label>
              <div className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                {thirdPartyClaimValue === "yes" ? "Yes" : thirdPartyClaimValue === "no" ? "No" : "Not selected"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 银行信息 */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Bank Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Account Holder's Name</label>
              <div className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                {parseStorageValue(accountHolderNameValue) || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Bank Name</label>
              <div className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                {parseStorageValue(bankNameValue) || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Bank Account Number</label>
              <div className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md font-mono">
                {parseStorageValue(bankAccountNumberValue) || "Not provided"}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Branch Name</label>
              <div className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                {parseStorageValue(branchNameValue) || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Branch Address</label>
              <div className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                {parseStorageValue(branchAddressValue) || "Not provided"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 提交提示 */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h3 className="text-lg font-medium text-amber-800 mb-2">Important Notice</h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              Please review all information carefully before submitting. Once submitted, you may not be able to modify your claim details. 
              Make sure all documents are uploaded and all required fields are completed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
