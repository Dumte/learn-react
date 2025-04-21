import Counter from './projects/counter/counter';
import Todo from './projects/Todo/Todo';

const App = () => {
   
  return (
    <div className='flex justify-center items-center flex-col gap-4 bg-blue-200 h-screen'>
      {/* <Counter /> */}

      {/* <div>=================</div> */}

      <Todo />
    </div>
  );
}

export default App