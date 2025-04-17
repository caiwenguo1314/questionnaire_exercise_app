

export default function BillComponent({item}: {item: number}) {
  return (
    <div className="border mt-10 p-4 items-center  w-full rounded-2xl">
        <div className="font-bold"> BILL {item}</div>
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
