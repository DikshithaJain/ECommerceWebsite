import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AddProductPage from './pages/AddProductPage';
import HomePage from './pages/HomePage';
import AddCategory from './pages/AddCategory';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
            <Route path='/addCategory' element={<AddCategory />} />
            <Route path='/addProduct' element={<AddProductPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<HomePage />} />
        </Routes>
    </div>
</BrowserRouter>
  );
}

export default App;
