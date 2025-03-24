// 保单选择页面的数据
export interface PolicyData {
  // policyName: string;
  // holderName: string;
}

// 问卷调查页面的数据类型
export interface QuestionnaireData {
  // chronicDisease: string;
  // medication: string;
}

// 银行信息页面的数据类型
export interface BankData {}

// 整个表单的状态类型

export interface FormState {
  policy: PolicyData;
  questionnaire: QuestionnaireData;
  bank: BankData;
  currentStep: "policy" | "question" | "bank" | "review";
  isComplete: boolean;
}

// 表单操作的类型

export type FormAction =
  | { type: "UPDATE_POLICY_DATA"; payload: PolicyData }
  | { type: "UPDATE_QUESTIONNAIRE_DATA"; payload: QuestionnaireData }
  | { type: "UPDATE_BANK"; payload: BankData }
  | { type: "SET_STEP"; payload: FormState["currentStep"] }
  | { type: "COMPLETE_FORM" };
