import axios from "axios";
import { useEffect, useState } from "react";
import fetchApi from "../../api/fetchApi";
import { useContext } from "react";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import {FaRepeat} from "react-icons/fa6";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const {setCategory} = useContext(CategoriesContext);
  useEffect(() => {
    async function fetchCategories() {
      const data = await fetchApi.get("products/categories");
      setCategories(data?.data);
    }
    fetchCategories();
  }, []);
  function handelCategory(e){
    setCategory(e.target.value);
  }
  // async function filterByCategory(category) {
  //   await fetchApi.get("products/category/" + category).then((data) => {
  //     setProducts(data?.data);
  //   });
  // }
  function resetFilter(){
    setCategory("");
  }
  return (
    <div className=" h-fit pb-12 md:w-1/5">
      <h2 className="font-bold text-black p-4 text-start">Categories</h2>
      <div className="categories flex flex-row  space-x-4 flex-wrap">
        {categories.map((category,index) => (
          <button key={index}
            className="px-2 py-2 ml-4 mt-4 rounded-full bg-gray-200"
            value={category}
            onClick={handelCategory}
          >
            {category}
          </button>
        ))}
      </div>
      <div className=" flex items-center" onClick={resetFilter}>
      <FaRepeat /> 
      <h2 className="font-bold text-black p-4 text-start" > Reset Filter</h2>

      </div>
    </div>
  );
};

export default Categories;
