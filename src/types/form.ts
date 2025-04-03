export interface Insurance {
  insurancePiece: string;
  insuranceNumber: string;
}   

export interface AssuredPerson {
  name: string;
  insurance: Insurance[];
}