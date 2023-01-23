const Budget = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-base p-2 px-2  bg-neutral-100 flex justify-between rounded-lg">
        <span className="text-primary-color text-base font-semibold">
          Budget
        </span>
        <span className="text-black font-semibold">500</span>
      </div>
      <div className="text-base bg-neutral-100 p-1 flex justify-around rounded-lg font-bold">
        <div className="flex flex-col text-center">
          <span className="text-green-500">333</span>
          <span className="text-gray-500 font-semibold"> 222</span>
        </div>

        <div className="border-r-2 border-gray-500" />
        <div className="flex flex-col text-center">
          <span className="text-red-600 ">{'222'}</span>
          <span className="text-gray-500 font-semibold"> 222</span>
        </div>
      </div>
      <div className="text-base bg-neutral-100 p-2 flex flex-col rounded-lg font-bold">
        <div className="border-b-2 border-gray-500 text-center">
          <span className="text-primary-color text-center w-full">34343</span>
        </div>
        <div className="flex w-full justify-around">
          <div className="flex flex-col text-center">
            <span className="text-green-600">{'12/12/2022'}</span>
            <span className="text-gray-500 font-semibold">{'12/12/2022'}</span>
          </div>
          <div className="border-r-2 border-gray-500" />
          <div className="flex flex-col text-center">
            <span className="text-red-600">{'12/12/2022'}</span>
            <span className="text-gray-500 font-semibold">{'12/12/2022'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
