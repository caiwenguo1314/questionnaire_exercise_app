import useQuestionnaireContext from "hooks/useQuestionnaireContext";
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import BillComponent from "components/form/BillComponent";

export default function QuestionnaireForm() {
  const { selectedCardData } = useQuestionnaireContext();
  const inputStyle =
    "w-10/12 border border-gray-900 rounded-2xl ml-2 pl-2 h-8 bg-gray-100";

  const [billsArray, setBillsArray] = useState<number[]>([1]);
  const [billCurrent, setBillCurrent] = useState<number>(1);
  const handleBillCurrent = () => {
    setBillCurrent((prev) => {
      const newBill = prev + 1;
      setBillsArray((prev) => [...prev, newBill]);
      return newBill;
    });
  };

  useEffect(() => {
    console.log(billCurrent);
    console.log(billsArray);
  }, [billCurrent, billsArray]);
  return (
    <div>
      <h1 className="text-2xl font-bold pt-2">Hospitalization claim</h1>
      <h3 className="mt-4">Life assured</h3>
      <h3 className="mt-4">{selectedCardData?.name}</h3>
      <h1 className="text-2xl font-bold pt-2 border-t-2 border-gray-300">
        Claim details
      </h1>
      <h4>
        Complete all mandatory fields marked with{" "}
        <span className="text-red-700">*</span>
      </h4>
      {/* input 输入框外层div */}
      <div className="flex flex-wrap">
        <div className="w-1/2 my-4">
          <h4>
            Admission date<span className="text-red-700">*</span>
          </h4>
          <input
            type="text"
            placeholder="14 Nov 2024"
            title="Admission date"
            className={`${inputStyle}`}
          />
        </div>
        <div className="w-1/2 my-4">
          <h4>
            Discharge date<span className="text-red-700">*</span>
          </h4>
          <input
            type="text"
            placeholder="Example"
            title="Discharge date"
            className={`${inputStyle}`}
          />
        </div>
        <div className="w-1/2">
          <h4>
            Hospital/clinic name<span className="text-red-700">*</span>
          </h4>
          <input
            type="text"
            placeholder="Example"
            title="Hospital/clinic name"
            className={`${inputStyle}`}
          />
        </div>
      </div>
      {/* 确认区域 */}
      <div className="mt-10 border-t-2 w-full pt-10">
        <div className="flex w-full h-20 border rounded-3xl items-center p-4 justify-between">
          <div>
            <span>
              |Did you claim this medical expense from a third
              party?(e.g.insurers or employers)
            </span>
            <span className="text-red-700">*</span>
          </div>
          <div>
            <button className="w-24 border h-10 rounded-l-2xl">Yes</button>
            <button className="w-24 border h-10 rounded-r-2xl">No</button>
          </div>
        </div>
      </div>
      {/* 提示区域 */}
      <div className="border mt-10 bg-gray-100 p-4 items-center w-full rounded-2xl">
        <ExclamationCircleFilled className="mr-4" />
        <span className="text-xs">
          Please ensure that you add bills and documents related to your
          hospitalization stay only. Please submit a new clams for all other
          items.
        </span>
      </div>
      {/* 添加账单区域 */}
      <h1 className="text-2xl font-bold pt-2 mt-4">Add bills</h1>
      <h3 className="mt-4">
        Complete all mandatory fields marked with{" "}
        <span className="text-red-700">*</span>
      </h3>
      {/* 一号账单 */}
      {billsArray.map((item, index) => (
        <BillComponent item={item} />
      ))}
      {/* 添加账单 */}
      <div
        className="border mt-10 w-1/2 rounded-2xl h-14 flex items-center justify-center text-gray-400"
        onClick={handleBillCurrent}
      >
        <PlusOutlined />
        <span className="ml-2">Add bill</span>
      </div>
      {/* 更新文档 */}
      <h1 className="text-2xl font-bold pt-10 border-t-2 border-gray-300 mt-10">
        Upload documents
      </h1>
      <h4 className="text-xs mt-2">
        Please retain original copies of these documents for 6 months from
        submission, as you may be required to submit them upon request. All
        document types marked with a <span className="text-red-700">*</span> are
        mandatory.
      </h4>
      {/* 输入框外层div 选择CARD区域 */}
      <div className="flex flex-wrap ">
        <div className="w-5/12 border h-14 rounded-2xl my-4 mr-10 ml-2"></div>
        <div className="w-5/12 border h-14 rounded-2xl my-4 mr-10 ml-2"></div>
        <div className="w-5/12 border h-14 rounded-2xl my-4 mr-10 ml-2"></div>
        <div className="w-5/12 border h-14 rounded-2xl my-4 mr-10 ml-2"></div>
        <div className="w-5/12 border h-14 rounded-2xl my-4 mr-10 ml-2"></div>
        <div className="w-5/12 border h-14 rounded-2xl my-4 mr-10 ml-2"></div>
        <div className="w-5/12 border h-14 rounded-2xl my-4 mr-10 ml-2"></div>
        <div className="w-5/12 border h-14 rounded-2xl my-4 mr-10 ml-2"></div>
        <div className="w-5/12 border h-14 rounded-2xl my-4 mr-10 ml-2"></div>
      </div>
    </div>
  );
}
