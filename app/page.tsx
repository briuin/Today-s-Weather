export default function Home() {
  return (
    <div className="flex flex-col">
      {/* page header */}
      <div className="border-b-solid border-b-[1px] w-full border-b-black">
        <h1>Today's Weather</h1>
      </div>

      {/* filter area */}
      <div className="flex flex-col">
        <div className="flex gap-[20px]">
          <div className="flex">
            <div>City: </div>
            <input />
          </div>

          <div className="flex">
            <div>Country: </div>
            <input />
          </div>

          <div className="flex gap-2">
            <button>search</button>
            <button>clear</button>
          </div>
        </div>

        <div className="border-red border-solid border-[1px] bg-red-400">
          Not found
        </div>
      </div>

      {/* history */}
      <div className="w-full">
        <div className="border-b-solid border-b-[1px] w-full border-b-black">
          <h1>Search History</h1>
        </div>
        <div className="w-full min-h-[300px] flex justify-center items-center">No Record</div>
      </div>
    </div>
  );
}
