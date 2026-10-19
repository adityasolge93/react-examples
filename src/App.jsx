// Developer's entry point. Start writing business logic from
// here.

import Student from './components/Student5';

function App() {
  return (
    <>
      <Student studentList={ [
        { name: 'John', rollNumber: 1, percentage: 33.0 },
        { name: 'Tom', rollNumber: 2, percentage: 75 },
        { name: 'Jack', rollNumber: 3, percentage: 23 },
      ] } />
    </>
  );
}

export default App;

