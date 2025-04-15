import useQuestionnaireContext from "hooks/useQuestionnaireContext";

export default function QuestionnaireForm() {
  const { selectedCardData } = useQuestionnaireContext();
  const inputStyle =
    "w-10/12 border border-gray-900 rounded-2xl ml-2 pl-2 h-8 bg-gray-100";
  return (
    <div>
      <h1 className="text-2xl font-bold pt-2">Hospitalization claim</h1>
      <h3 className="mt-4">Life assured</h3>
      <h3 className="mt-4">{selectedCardData?.name}</h3>
      <h1 className="text-2xl font-bold pt-2 border-t-2 border-gray-300">
        Claim details
      </h1>
      <h4>
        Complete all mandatory fields marked with
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
      </div>
    </div>
  );
}
