import './App.css';
import UserForm from './ui/users/UserForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Confiration from './ui/Confirmation';
import Navbar from './ui/Navbar';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('http://localhost:5432/users/details').then((data) => {
      console.log('data: ', data.data);
    });
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/form/:action' element={<UserForm />} />
          <Route path='/confirm/:userId/:login' element={<Confiration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
