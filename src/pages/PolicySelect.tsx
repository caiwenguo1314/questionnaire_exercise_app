import React from "react";

export default function PolicySelect() {
  const name: string = "Jay Wang";
  return (
    <div>
      <h1 className="text-3xl font-bold">Select Life Assured</h1>
      <h3>Please select 1 life assured for this medical claim.</h3>
      <div className="w-full h-32 bg-white border-none rounded-3xl mt-4 shadow-md">
        <div
          className={`w-5 h-5 border rounded-full relative top-3 left-5 ${
            false ? "bg-blue-500" : " border-gray-600"
          } flex justify-center items-center shadow-lg `}
          onClick={() => {}}
        >
          <div
            className={`w-2 h-2  rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
              true ? "bg-white" : "border-none"
            }`}
          ></div>
        </div>
        <div className="relative left-14 -top-4 font-bold text-2xl">{name}</div>
        <div className="flex relative left-10 top-6 gap-8">
          <div>
            <div>Piece of CakeTerm InsuranceA</div>
            <div>P30000000421</div>
          </div>
          <div>
            <div>Piece of CakeTerm InsuranceA</div>
            <div>P30000000421</div>
          </div>
          <div>
            <div>Piece of CakeTerm InsuranceA</div>
            <div>P30000000421</div>
          </div>
        </div>
      </div>
    </div>
  );
}
