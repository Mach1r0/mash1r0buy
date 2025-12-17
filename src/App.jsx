import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/navbar'
import Home from './pages/home'
import ProdutoPage from './pages/produto'
import Footer from './components/footer/footer'
import { useCart } from './hooks/useCart'
import './App.css'

function App() {
  const { cart, products, addToCart, removeFromCart, removeItemCompletely, setCartProducts, getTotalItems } = useCart();

  return (
    <div className="app-root">
      <BrowserRouter>
        <Navbar 
          cart={cart}
          products={products}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          removeItemCompletely={removeItemCompletely}
          getTotalItems={getTotalItems}
        />
        <Routes>
          <Route path="/" element={
            <Home 
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              setCartProducts={setCartProducts}
            />
          } />
          <Route path="/produto/:slug" element={
            <ProdutoPage 
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              setCartProducts={setCartProducts}
            />
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App