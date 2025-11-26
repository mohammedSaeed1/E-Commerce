import { useEffect, useState } from "react";
import useProducts from "../../Hooks/useProducts";
import { Link, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import useAddProducts from './../../Hooks/useAddProducts';
import { Helmet } from "react-helmet-async";

export default function ProductsCategory(){
  
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {categoryname} = useParams();
  const {addProduct} = useAddProducts();
  const {getAllProducts} = useProducts();
  
  async function getProducts(){
       const {data} = await getAllProducts();
         const filteredProds = data.data.filter(product => product.category.name === categoryname);
         setFilteredProducts(filteredProds);
         setIsLoading(false);} 

  useEffect( () => {
    getProducts();
  },[])
  
return (
    <>
    {isLoading ? <Spinner/> :<>
     <section>
          <div className="row justify-center items-center">
        { filteredProducts.length > 0 ?  filteredProducts?.map(product => <div key={product.id} className="w-full md:w-1/2 md:px-5 lg:w-1/4 xl:w-1/5 md:p-4 group text-center">
         <Helmet>
        <title>{product.category.name}</title>
         </Helmet>
            <Link to={`/productdetails/${product?.id}/${product?.category?.name}`}>
              <div className="product text-center">
                <img
                  className="w-full"
                  src={product?.imageCover}
                  alt={product?.title}
                />
                <h2 className="text-center text-green-500 font-semibold ">
                  {product?.category?.name}
                </h2>
                <h3 className="text-center py-0.5 text-slate-950 dark:text-white">{product?.title.slice(0, 20)}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-semibold dark:text-white">{product?.price} EGP</span>
                  <span className="font-semibold dark:text-white">
                    {product?.ratingsAverage}
                    <i className="fas fa-star text-yellow-300"></i>
                  </span>
                </div>
              </div>
            </Link>
             <button onClick={()=>addProduct(product.id)} className="btn mt-1 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 duration-1000">
                  Add to Cart  <i className="fa-solid ps-2 fa-cart-plus"></i>
                </button>
          </div>
        ) :  <section className="text-center">
                  <h3 className="md:text-3xl text-2xl py-28 font-bold text-green-600">
                   Sorry ☺️ , No Products found for this category at this time .
                  </h3>
                </section>  }
      </div>
     </section>
    </>}
    
    </>
)

}