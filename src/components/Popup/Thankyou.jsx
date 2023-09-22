import { useContext, useEffect, useState } from "react";
import { FaXmark, FaFaceLaughWink } from "react-icons/fa6";
import Cart from "../Carts/Cart";
import { CartContext } from "../../contexts/CartContext";
import { redirect } from "react-router-dom";


function getDate() {
  const today = new Date();
  // console.log(today.toLocaleString('default', { month: 'short' })
  // )
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${today.toLocaleString('default', { month: 'short' })} ${date} , ${year}`;
}


export default function Thankyou() {

  const { cart } = useContext(CartContext);
  const [currentDate, setCurrentDate] = useState(getDate());
  const [total, setTotal] = useState(0);

  useEffect(()=>{
    function calculateTotal() {
      let sum = 0;
      sum = cart.reduce((total, currentproduct) => {
        return total + currentproduct.price * currentproduct.quantity;
      }, 0);
      setTotal(sum.toFixed(2));
    }
    calculateTotal();
  },[])


  return (
    <div className="absolute bg-[#FAF9FF] w-full p-6 text-center space-y-8">
      <h2 className="font-bold text-5xl ">
        Thank you for your order
      </h2>
      <p>
        Your order lade our day - we hope that this makes yours! your support
        means the world love if you can share a snap on social media
      </p>
      <div className="shadow-md container mx-auto md:w-1/2 py-4 ">
      <h2 className="font-bold text-xl ">
        Thank you, your order has been recieved
      </h2>
      <div className="container mx-auto w-4/5 py-8 px-4 my-4 bg-[#F1F1F1] flex flex-col md:flex-row gap-4 text-start md:items-center  divide-dashed divide-neutral-950 md:divide-x">
          <div className="flex md:flex-col text-start justify-between ">
            <p >Order number:</p>
            <p >125478</p>
          </div>
          <div className="flex md:flex-col text-start md:pl-2 justify-between">
            <p >Date:</p>
            <p >{currentDate}</p>
          </div>
          <div className="flex md:flex-col text-start md:pl-2 justify-between">
            <p >Total:</p>
            <p >${total}</p>
          </div>
      </div>
      <div className="container mx-auto w-4/5 py-8 px-4 my-4 bg-[#F1F1F1] flex flex-col gap-4 ">
        <h1 className="text-center">Order details</h1>
          <div className="flex flex-col text-start divide-y divide-dashed divide-neutral-950">
          <div className="flex flex-row justify-between text-start py-4">
            <p >Product</p>
            <p >Total</p>
          </div>
          {cart.map((product) => (
            <div className="flex flex-row justify-between text-start py-4" key={product.id}>
            <p >{product.title} x {product.quantity}</p>
            <p >${product.price * product.quantity}</p>
          </div>
          ))}
          <div className="flex flex-row justify-between text-start py-4">
            <p >Total</p>
            <p >${total}</p>
          </div>
          </div>
          
      </div>
    
      </div>
    </div>

  );
}
