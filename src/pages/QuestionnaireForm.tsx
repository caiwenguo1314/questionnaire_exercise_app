import useQuestionnaireContext from "hooks/useQuestionnaireContext";
import { useEffect } from "react";

export default function QuestionnaireForm() {
  const { selectedCardData } = useQuestionnaireContext();
  


  return (
    <div>
      <h1 className="text-2xl font-bold pt-2">Hospitalization claim</h1>
      <h3 className="mt-4">Life assured</h3>
      <h3 className="mt-4">{selectedCardData?.name}</h3>
    </div>
  );
}
