import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";
export default function AddToCart({product,handelAddToCart}){

    return(
        <button onClick={()=>{handelAddToCart(product)}} className="bg-zinc-900 text-white p-2 mt-4 hover:bg-yellow-300 w-full" >
        Add to cart
      </button>
    )
}