import './App.css';
import UserForm from './ui/users/UserForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Confiration from './ui/Confirmation';
import Navbar from './ui/Navbar';
import ProductList from './ui/products/ProductList';
import ProductDetails from './ui/products/ProductDetails';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/form/:action' element={<UserForm />} />
          <Route path='/confirm/:userId/:login' element={<Confiration />} />
          <Route path='/details/:productId' element={<ProductDetails />} />
          <Route path='/buy%20now' element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
