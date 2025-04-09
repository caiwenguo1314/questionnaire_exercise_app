import { questionnaireContext } from "context/questionnaireContext";
import  { useContext } from "react";

export default function useQuestionnaireContext() {
  const context = useContext(questionnaireContext);
  if (!context) {
    throw new Error(
      "useQuestionnaireContext must be used within a QuestionnaireContextProvider"
    );
  }
  return context;
}
