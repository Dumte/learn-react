import React, { useState } from 'react'

const Counter = () => {
  // Set the state variable
 const [count, setCount] = useState(0);

  const handleDecrease = () => {
    setCount((prev) => prev - 1);
  };
  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };
  const handleReset = () => {
    setCount(0);
    };
    
  return (
    <div className="flex flex-col w-full max-w-md rounded-md my-2 mx-auto p-4  bg-blue-100">
      <h1 className="text-2xl md:text-3xl mb-6 text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg shadow">
        Counter App
      </h1>

      <div className='mb-4'>
        <h2 className="text-2xl text-gray-500 ">
          Count value is: <span className="bg-white rounded-md px-4 py-1">{count}</span>
        </h2>
      </div>

      {/* container for our buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleDecrease}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors whitespace-nowrap"
        >
          Decrease
        </button>
        <button
          onClick={handleReset}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors whitespace-nowrap"
        >
          Reset
        </button>
        <button
          onClick={handleIncrease}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors whitespace-nowrap"
        >
          Increase
        </button>
      </div>
    </div>
  );
}

export default Counter