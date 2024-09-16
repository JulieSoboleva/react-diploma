import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './hooks';
import { updateCart } from './redux/slices/StoreSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Contacts from './pages/Contacts';
import Cart from './pages/Cart';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateCart());
  }, [dispatch]);

  return (
    <BrowserRouter basename='/react-diploma'>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}