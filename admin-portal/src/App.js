import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import OrderPage from './OrderPage';
import UserPage from './UserPage';
import SellerPage from './SellerPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sellers' element={<SellerPage />} />
        <Route path='/users' element={<UserPage />} />
        <Route path='/orders' element={<OrderPage />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
