

import React from "react";

interface BillComponentProps {
  billIndex: number;
  onDelete?: (index: number) => void;
  canDelete?: boolean;
}

export default function BillComponent({
  billIndex,
  onDelete,
  canDelete = true,
}: BillComponentProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-6 space-y-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 mt-10 w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
              #{billIndex + 1}
            </span>
            Medical Bill
          </h3>
          {canDelete && onDelete && (
            <button
              onClick={() => onDelete(billIndex)}
              className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center space-x-2 border border-red-200 hover:border-red-300"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Remove</span>
            </button>
          )}
        </div>
        <div className="flex w-full">
          <div className="w-1/2 pr-4">
            <h4>Invoice number</h4>
            <input
              type="text"
              className="h-8 border bg-gray-100 rounded-2xl p-2 w-full"
              placeholder="Example"
            />
          </div>
          <div className="flex">
            <div className="w-1/4 mr-4">
              <h3 className="w-28">
                bill amount <span className="text-red-700">*</span>
              </h3>
              <select
                className="border h-8 rounded-2xl bg-gray-100 cursor-pointer w-full leading-6 pl-2"
                defaultValue="IDR"
              >
                <option value="IDR">IDR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div className="w-3/4">
              <div className="h-6"></div>
              <input
                type="number"
                placeholder="1.000.000.00"
                className="border h-8 rounded-2xl bg-gray-100 w-full p-2"
              />
            </div>
          </div>
        </div>
      </div>
  )
}
