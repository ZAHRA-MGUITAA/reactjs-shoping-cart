import { Outlet } from "react-router-dom";
import Cart from "../components/Carts/Cart";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Checkout from "../components/Checkout/Checkout";
import { CategoriesContext } from "../contexts/CategoriesContext";
import {FaCartShopping} from "react-icons/fa6";
const CartLayout = () => {

  const [category, setCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);


  return (
    <CartContext.Provider value={{ cart, setCart, isCartOpen, setIsCartOpen }}>
      <CategoriesContext.Provider value={{ category, setCategory }}>
        <div className=" mx-auto">
          <Cart/>
          <div
            className={` flex flex-col md:flex-row `}
          >
            
            <Outlet />
          </div>
        </div>
      </CategoriesContext.Provider>
    </CartContext.Provider>
  );
};

export default CartLayout;
