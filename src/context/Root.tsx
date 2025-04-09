import React from "react";
import { Outlet } from "react-router-dom";
import { QuestionnaireContextProvider } from "../context/questionnaireContext";
export default function Root() {
  return (
    <QuestionnaireContextProvider>
      <Outlet />
    </QuestionnaireContextProvider>
  );
}
