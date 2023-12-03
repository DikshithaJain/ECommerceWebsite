import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
            <Route path='/orders' element={<OrderPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/categories/:name' element={<CategoryPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<HomePage />} />
        </Routes>
    </div>
</BrowserRouter>
  );
}

export default App;
