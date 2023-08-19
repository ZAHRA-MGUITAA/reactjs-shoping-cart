import { useContext, useEffect, useMemo, useState } from "react";
import { Form, Link, useLocation } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import Thankyou from "../Popup/Thankyou";

const Checkout = () => {
  const location = useLocation();
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [countries, setCountries] = useState([]);
  const [isPopupOpen,setIsPopupOpen] = useState(false);
  useEffect(() => {
    function calculateTotal() {
      let sum = 0;
      sum = cart.reduce((total, currentproduct) => {
        return total + currentproduct.price * currentproduct.quantity;
      }, 0);
      setTotal(sum.toFixed(2));
    }
    calculateTotal();
    async function fetchCountries() {
      await fetch("https://restcountries.com/v3.1/all")
        .then((res) => {
          return res.json();
        })
        .then((res) => setCountries(res));
    }
    fetchCountries();
  }, []);

  function openPopup(){
    
     setIsPopupOpen(!isPopupOpen)
  }
  // const openPopup = useEffect(()=>{
  //   setIsPopupOpen(true)
  // },[isPopupOpen])
  return (
    <div> 
 <div className="flex flex-col md:flex-row    absolute w-full h-full">
      <div className="form-info md:w-1/2 px-14 flex  py-10 flex-col gap-4 bg-white shadow-md">
        <h2 className="text-3xl font-bold text-black">
          Enter your shipping infos
        </h2>
        {/* <p className="flex flex-row">
          <Link to={location.pathname}>checkout</Link> {">"} <Link>Information</Link> {">"} <Link>Payement</Link>
        </p> */}
        <Form className="flex flex-col w-full gap-4"  method="get" action="/thankyou" >
          <div className="email flex flex-col gap-2">
            <label htmlFor="email" className="text-black font-medium text-lg ">
              Email
            </label>
            <input
              className=" border w-full rounded-md px-3 py-2  border-slate-300 focus:outline-none placrholder-slate-400 text-sm"
              type="text"
              name="email"
            />
          </div>
          <div className="billing flex flex-col gap-2">
            <label
              htmlFor="billing"
              className="text-black font-medium text-lg "
            >
              Billing address
            </label>
            <select
              name="country"
              placeholder="country/region"
              id=""
              className="border w-full rounded-md px-3 py-2 border-slate-300 focus:outline-none"
            >
              {countries.map((country) => (
                <option key={country.name.common} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}

              <option value="Algerie">Algerie</option>
            </select>
            <div className="flex flex-row gap-2">
              <input
                placeholder="First Name"
                className=" border w-full rounded-md px-3 py-2  border-slate-300 focus:outline-none placrholder-slate-400 text-sm"
                type="text"
                name="firstName"
              />
              <input
                placeholder="Last Name"
                className=" border w-full rounded-md px-3 py-2  border-slate-300 focus:outline-none placrholder-slate-400 text-sm"
                type="text"
                name="lastName"
              />
            </div>
            <input
              placeholder="Address"
              className=" border w-full rounded-md px-3 py-2  border-slate-300 focus:outline-none placrholder-slate-400 text-sm"
              type="text"
              name="address"
            />
            <input
              placeholder="Apartment, suite, etc. (optional)"
              className=" border w-full rounded-md px-3 py-2  border-slate-300 focus:outline-none placrholder-slate-400 text-sm"
              type="text"
              name="appartment"
            />
            <div className="flex flex-col gap-2 md:flex-row">
              <input
                placeholder="City"
                className=" border w-full rounded-md px-3 py-2  border-slate-300 focus:outline-none placrholder-slate-400 text-sm"
                type="text"
                name="city"
              />
              <input
                placeholder="Postal code"
                className=" border w-full rounded-md px-3 py-2  border-slate-300 focus:outline-none placrholder-slate-400 text-sm"
                type="text"
                name="postalcode"
              />
              <input
                placeholder="State"
                className=" border w-full rounded-md px-3 py-2  border-slate-300 focus:outline-none placrholder-slate-400 text-sm"
                type="text"
                name="state"
              />
            </div>
          </div>
          <div className="relative">
          
              <button className="absolute bg-blue-600 text-white px-4 py-2 w-48 right-0 rounded-md">
                Checkout
              </button>
           
          </div>
        </Form>
      </div>
      <div className="md:w-1/2 px-14 md:px-20 py-10 bg-[#F5F5F5] h-full flex flex-col gap-10">
        <div className="products flex flex-col gap-10">
          {cart.map((product) => (
            <div className="product flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-4 relative">
                <img
                  src={product.image}
                  className="w-12 object-contain border p-2 "
                  alt=""
                />
                <span className="bg-gray-500 text-white rounded-full w-6 h-6 flex justify-center	absolute top-0 left-10">
                  {product.quantity}
                </span>
                <p>{product.title}</p>
              </div>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
        <div className="total flex flex-col gap-4">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-bold">${total}</p>
          </div>
        </div>
      </div>
    </div>
   </div>
   
  );
};

export default Checkout;
