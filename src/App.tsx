import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import { ProductProvider } from './context/ProductContext';
import Navbar  from './components/Navbar';
import Cart from './pages/Cart';
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrdersDetails from './pages/OrdersDetails';
import Orders from './pages/Orders';

function App() {
  return (
    
    <Container>
      <ProductProvider>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path= "/profile" element={<Profile />} />
              <Route path= "/cart" element={<Cart />} />
              <Route path= "/login" element={<Login />} />
              <Route path= "/logout" element={<Logout />} />
              <Route path= "/register" element={<Register />} />
              <Route path= "/orders" element={<Orders />} />
              <Route path= "/orders/:id" element={<OrdersDetails />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ProductProvider>
    </Container>
  );
}

export default App;