import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.jsx'
import Register from './Pages/Auth/Register.jsx';
import Login from './Pages/Auth/Login.jsx';
import OrdersRequests from './Pages/OrdersRequests.jsx';
import Categories from './Pages/Categories.jsx';
import Vouchers from './Pages/Vouchers.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import PrivateRoute from './PrivateRoute.jsx/PrivateRoute.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path='/admin' element={<PrivateRoute />}>
        <Route path='order-requests' element={<OrdersRequests />} />
        <Route path='categories' element={<Categories />} />
        <Route path='vouchers' element={<Vouchers />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Route >
    </Routes>
  );
}

export default App;
