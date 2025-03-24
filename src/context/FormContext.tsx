import React, { createContext, useState } from "react";
import { FormState, FormAction } from "../types/form";

//初始状态
const initialState: FormState = {
  policy: {},
  questionnaire: {},
  bank: {},
  currentStep: "policy",
  isComplete: false,
};

//创建Context
const FormContext = createContext<any>(null);
// {
//   state: FormState;
//   dispatch: React.Dispatch<FormAction>;
// } 

//创建Provider
export function FormProvider({children}:{children: React.ReactNode }){
  
return(
  <FormContext.Provider value={{}} >
    {children}
  </FormContext.Provider >
);
}