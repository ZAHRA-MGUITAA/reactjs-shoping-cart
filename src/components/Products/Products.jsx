import { useContext, useState, useEffect } from "react";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { CartContext } from "../../contexts/CartContext";
import AddToCart from "../Carts/AddToCart";
import fetchApi from "../../api/fetchApi";

export default function Products() {
  // const { products,setProducts } = useContext(productsContext);
  // let {cart} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filtredproducts, setfiltredproducts] = useState([]);
  const { cart, setCart,isCartOpen,setIsCartOpen } = useContext(CartContext);
  const { category } = useContext(CategoriesContext);

  useEffect(() => {
    async function fetchproduct() {
      await fetchApi.get("products").then((data) => {
        setProducts(data?.data);
      });
    }
    fetchproduct();
  }, []);
  useEffect(() => {
    if (category) {
      // console.log(category);
      // let filtredproducts = [];
      let filtredproducts = products.filter(
        (item) => item.category === category
      );
      setfiltredproducts(filtredproducts);
    } else {
      setfiltredproducts(products);
    }
  }, [category, products]);

  const findProduct = (product)=>{
    return cart.find((element) => element.id == product.id);
  }

  function handelAddToCart(product) {
    if (findProduct(product)) {
      cart.find((element) => element.id == product.id).quantity++;
      setCart([...cart]);
    } else {
      // setCart([...cart, { product, quantity: 1 }]);
      setCart([...cart, { 
        "id" : product.id,
        "image" : product.image,
        "title" : product.title,
        "description" : product.description,
        "price" : product.price,
        quantity:1
      }]);

    }
    setIsCartOpen(true);
  }

  return (
    <div className="flex flex-wrap justify-between space-y-4 md:gap-6 md:w-4/5">
      {filtredproducts?.map((product) => (
        <div
          className="flex flex-col w-1/2 px-4 text-center items-center justify-between md:w-48 "
          key={product.id}
        >
          <img
            className="h-32 w-fit bg-black w-fit"
            src={product.image}
            alt=""
          />
          <p className="text-bold text-black px-2 ">{product.title}</p>
          <span className="border-t-2 border-yellow-300 h-6 w-6"></span>
          <p className="font-bold text-black text-xl	mt-4">
            <span className="text-sm font-normal">$ </span>
            {Number.parseInt(product.price)}
            {product.price.toString().split(".")[1] ? (
              <span className="font-normal text-red text-sm	">
                .{product.price.toString().split(".")[1]}
              </span>
            ) : (
              ""
            )}
          </p>
          {/* <button className="bg-zinc-900 text-white p-2 mt-4 hover:bg-yellow-300 w-full" >
      Add to cart
    </button> */}
          <AddToCart product={product} handelAddToCart={handelAddToCart} />
        </div>
      ))}
    </div>
  );
}
