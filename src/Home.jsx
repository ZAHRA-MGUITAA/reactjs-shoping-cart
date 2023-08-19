import { useEffect, useState, useContext } from "react";
import "./App.css";
import { FaCartShopping } from "react-icons/fa6";
import Cart from "./components/Carts/Cart";
import { CategoriesContext } from "./contexts/CategoriesContext";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import fetchApi from "./api/fetchApi";
import { CartContext } from "./contexts/CartContext";
import Checkout from "./components/Checkout/Checkout"
function Home() {




  return (
   
        <div className="container mx-auto">
          <Cart />
          <div
            className={`container mt-24 flex flex-col md:space-x-6 md:flex-row `}
          >
            <Categories />
            <Products />
          </div>
        </div>
  
  );
}

export default Home;
