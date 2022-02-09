import './App.css';
import UserForm from './ui/users/UserForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/form/:action' element={<UserForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
