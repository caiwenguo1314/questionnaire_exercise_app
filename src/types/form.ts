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

export interface QuestionnaireContextType {
  AssuredCardData: AssuredPerson[];
  Steps: Step[];
  stepCurrent: number;
  setStepCurrent: (step: number) => void;
  footButtonOnClick: (label: string) => void;
  selectedCardData: AssuredPerson | null;
  setSelectedCardData: (Data: AssuredPerson | null) => void;
}
