import { useContext, useEffect, useState } from "react";
import { FaXmark, FaCartShopping, FaPlus, FaMinus } from "react-icons/fa6";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cart, setCart,isCartOpen,setIsCartOpen } = useContext(CartContext);
  // const [isCartOpen,setIsCartOpen] = useState(false);
  // console.log(cart);
  const [total, setTotal] = useState(0);
  function addQuantity(productcart) {
    cart.find((product) => product.id == productcart.id).quantity++;
    setCart([...cart]);
  }

  function minusQuantity(productcart) {
    productcart.quantity > 1 &&
      cart.find((product) => product.id == productcart.id).quantity--;
    setCart([...cart]);
  }
  useEffect(() => {
    function calculateTotal() {
      let sum = 0;
      sum = cart.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
      setTotal(sum.toFixed(2));
    }
    calculateTotal();
  }, [cart]);

  function deleteFromCart(productcart) {
    const FiltredCart = cart.filter((product) => {
      return product.id != productcart.id;
    });
    setCart(FiltredCart);
  }
  function handelOpenCart(){
    setIsCartOpen(!isCartOpen);
  }

  return (
    <>
      <div className="icon absolute top-0 right-0 size-10 p-6 bg-black z-20" onClick={handelOpenCart}>
        <FaCartShopping className="fill-white " />
      </div>
      <div className={`flex flex-row md:justify-end  z-50 fixed ${!isCartOpen? "hidden":undefined} w-2/3 `} >
        <div className="icon  fixed top-0 bg-black-gray  p-4 z-50 left-0	md:left-2/3" onClick={handelOpenCart}>
          <FaXmark className="fill-white" />
        </div>
        <div className="flex flex-col justify-between h-screen bg-black-gray pt-10 w-full md:w-1/3  top-0 right-0 text-white fixed">
          <div className="flex justify-center items-center space-x-4">
            <FaCartShopping className="fill-white" />
            <h2 className="text-bold text-white">Cart</h2>
          </div>
          {cart.length==0 && <div className="flex flex-col items-center">
            <p>Add some products in the cart</p>
            <p>:)</p>
            </div>}
          <div className="no-scrollbar list-products flex flex-col relative py-2 px-2 overflow-scroll">
            {cart.map((product) => (
              <div
                className="flex flex-col relative py-2 border-t-2 border-black "
                key={product.id}
              >
                <FaXmark
                  className=" absolute right-0 top-2"
                  onClick={() => {
                    deleteFromCart(product);
                  }}
                />

                <div className=" flex text-white px-4 justify-between mt-6">
                  <div className="flex space-x-4 ">
                    <img
                      src={product.image}
                      className="w-12  object-contain"
                      alt=""
                    />
                    <div>
                      <p>{product.title}</p>
                      <div className="quantity flex">
                        <p>quantity : </p>
                        <p>{product.quantity}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-between">
                    <p>$ {product.price}</p>
                    <button className="flex flex-row bg-black py-2 px-4 items-center justify-between">
                      <FaPlus
                        onClick={() => {
                          addQuantity(product);
                        }}
                      />{" "}
                      <FaMinus
                        onClick={() => {
                          minusQuantity(product);
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col bg-black-gray bottom-0 right-0 px-4 py-10 space-y-6  shadow-2xl shadow-black  ">
            <div className="flex justify-between">
              <h4>SUBTOTAL</h4>
              <h4>$ {total}</h4>
            </div>
            <Link to={"checkout"} onClick={()=>{setIsCartOpen(false)}} className={cart.length==0?`disable-link`:undefined}><div  className="text-center bg-black-checkout p-4 hover:bg-black " >
              CHECKOUT
            </div></Link >
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
