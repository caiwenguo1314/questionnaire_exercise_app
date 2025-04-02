import React from "react";
import AssuredCard from "../components/ui/assuredCard";
const AssuredCardData = [
  {
    name: "John Doe",
    insurance: [
      {
        insurancePiece: "Piece of CakeTerm InsuranceA",
        insuranceNumber: "P30000000421",
      },
      {
        insurancePiece: "Piece of CakeTerm InsuranceB",
        insuranceNumber: "P30000000152",
      },
      {
        insurancePiece: "Piece of CakeTerm InsuranceC",
        insuranceNumber: "P30000000754",
      },
    ],
  },
  {
    name: "Jane Lou",
    insurance: [
      {
        insurancePiece: "Piece of CakeTerm InsuranceA",
        insuranceNumber: "P30000000231",
      },
      {
        insurancePiece: "Piece of CakeTerm InsuranceB",
        insuranceNumber: "P30000000762",
      },
    ],
  },
  {
    name: "Stallia Wong Yanghe",
    insurance: [
      {
        insurancePiece: "Piece of CakeTerm InsuranceA",
        insuranceNumber: "P30000000521",
      },
    ],
  },
];

export default function PolicySelect() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Select Life Assured</h1>
      <h3>Please select 1 life assured for this medical claim.</h3>
      <AssuredCard AssuredCardData={AssuredCardData} />
    </div>
  );
}
