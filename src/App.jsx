import React, {useState} from 'react'

const App = () => {
    // Set the state variable
    const [count, setCount] = useState(0);
 
    const handleDecrease = () => {
       setCount(prev => prev -1)
    }
    const handleIncrease = () => {
       setCount(prev => prev + 1)
    }
    const handleReset = () => {
       setCount(0)
    }
  return (
    <div className='h-screen flex justify-center items-center flex-col gap-4'>
      <h1 className='text-4xl italic font-semibold'>Count value is: {count}</h1>

      {/* container for our buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleDecrease}
          className="bg-blue-400 hover:bg-blue-600  text-white py-2 px-4 "
        >
          Decrease
        </button>
        <button
          onClick={handleReset}
          className="bg-blue-400 hover:bg-blue-600  text-white py-2 px-4 "
        >
          Reset
        </button>
        <button
          onClick={handleIncrease}
          className="bg-blue-400 hover:bg-blue-600  text-white py-2 px-4 "
        >
          Increase
        </button>
      </div>
    </div>
  );
}

export default App