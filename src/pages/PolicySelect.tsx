import AssuredCard from "../components/ui/assuredCard";

export default function PolicySelect({
  selectedUserIndex,
  setSelectedUserIndex,
}: {
  selectedUserIndex: number | null;
  setSelectedUserIndex: (index: number) => void;
}) {
  const assuredCardData = [
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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-bold text-gray-800">
          Select Life Assured
        </h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <span className="font-medium">Please select 1 life assured</span>{" "}
            for this medical claim.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="space-y-4">
        <AssuredCard
          assuredCardData={assuredCardData}
          selectedUserIndex={selectedUserIndex}
          setSelectedUserIndex={setSelectedUserIndex}
        />
      </div>
    </div>
  );
}
