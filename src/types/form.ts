export interface Insurance {
  insurancePiece: string;
  insuranceNumber: string;
}

export interface AssuredPerson {
  name: string;
  insurance: Insurance[];
}

export interface Step {
  id: number;
  label: string;
}
export interface UploadCardData {
  name: string;
}
export interface validationState {
  AccountHolderName: boolean;
  BankName: boolean;
  BankAccountNumber: boolean;
  BranchName: boolean;
  BranchAddress: boolean;
}
export interface inputValue {
  AccountHolderName: string;
  BankName: string;
  BankAccountNumber: string;
  BranchName: string;
  BranchAddress: string;
}


export interface QuestionnaireContextType {
  AssuredCardData: AssuredPerson[];
  Steps: Step[];
  stepCurrent: number;
  setStepCurrent: (step: number) => void;
  footButtonOnClick: (label: string) => void;
  selectedCardData: AssuredPerson | null;
  setSelectedCardData: (Data: AssuredPerson | null) => void;
  setSelected: (selected: (prev: boolean[]) => boolean[]) => void;
  selected: boolean[];
  UploadCardsData: UploadCardData[];
  validationState: validationState;
  setValidationState: (validationState: validationState) => void;
  inputValue: inputValue;
  setInputValue: (inputValue: inputValue) => void;
}
