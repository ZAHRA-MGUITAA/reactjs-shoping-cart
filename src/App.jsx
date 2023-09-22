import { useEffect, useState, useContext } from "react";
import "./App.css";
import { FaCartShopping } from "react-icons/fa6";
import Cart from "./components/Carts/Cart";
import { CategoriesContext } from "./contexts/CategoriesContext";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import fetchApi from "./api/fetchApi";
import { CartContext } from "./contexts/CartContext";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Home";
import CartLayout from "./layouts/cartLayout";
import Checkout from "./components/Checkout/Checkout";
import Thankyou from "./components/Popup/Thankyou";


function App() {
  // const [category, setCategory] = useState("");

  // const [cart,setCart] = useState([]);
  // const [isCartOpen,setIsCartOpen] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<CartLayout />}>
        <Route index element={<Home />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="thankyou" element={<Thankyou />} />
      </Route>
    ), { basename:"/reactjs-shoping-cart/" }
  );

  return <RouterProvider router={router} />;
}

export default App;
