import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import { ProductProvider } from './context/ProductContext';
import Navbar  from './components/Navbar';
import Cart from './pages/Cart';

function App() {
  return (
    
    <Container>
      <ProductProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path= "/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </Container>
  );
}

export default App;