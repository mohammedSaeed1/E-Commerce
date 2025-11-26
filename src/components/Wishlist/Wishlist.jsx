import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import Spinner from "../Spinner/Spinner";
import useAddProducts from "../../Hooks/useAddProducts";
import { Link } from "react-router-dom";
import NoProductsFound from "../NoProductsFound/NoProductsFound";
import useRemoveFromWishlist from "../../Hooks/useRemoveFromWishlist";
import { Helmet } from "react-helmet-async";


export default function Wishlist(){
    
const [isLoading , setIsLoading] = useState(true);
const {getLoggedUserWishlist ,  setUserWishlist , userWishlist} = useContext(WishlistContext);
 
  const {addProduct} = useAddProducts();
  const {removeFromWishlist} = useRemoveFromWishlist();

    async function getUserWishlist(){
      const {data} = await getLoggedUserWishlist();
      setUserWishlist(data?.data);      
      setIsLoading(false);      
    }  
    

useEffect(() => {
 getUserWishlist();
},[userWishlist])

return (
     <>
      <Helmet>
   <title>WishList</title>
     </Helmet>
        {isLoading ?
          <Spinner /> : <>
          <section className="text-center py-8">
          <h2 className="md:text-3xl text-2xl font-serif font-semibold text-green-600 dark:text-white border-b-4 border-green-600 inline">WishList Items</h2>
        {userWishlist?.length > 0 ? <div className="row">
            {userWishlist?.map((product) => (
              <div key={product.id} className="w-full sm:w-1/2 md:px-5 lg:w-1/4 xl:w-1/5 p-4 text-center group">
                <Link
                  to={`/productdetails/${product?.id}/${product?.category?.name}`}
                >
                  <div className="product">
                    <img
                      className="w-full"
                      src={product?.imageCover}
                      alt={product?.title}
                    />
                    <h2 className="text-center text-green-500 font-semibold ">
                      {product?.category?.name}
                    </h2>
                    <h3 className="text-center py-0.5 text-slate-950 dark:text-white ">
                      {product?.title?.slice(0, 20)}
                    </h3>
                    <div className="flex justify-between items-center dark:text-white">
                      <span className="font-semibold">{product?.price} EGP</span>
                      <span className="font-semibold">
                        {product?.ratingsAverage}
                        <i className="fas fa-star text-yellow-300"></i>
                      </span>
                    </div>
                   
                   
                  </div>
                </Link>
                <button onClick={()=>addProduct(product.id)} className="btn mt-1 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 duration-1000">
                  Add to Cart  <i className="fa-solid ps-2 fa-cart-plus"></i>
                </button>
                <i onClick={() => removeFromWishlist(product.id)} className=" fa-solid fa-trash ps-5 cursor-pointer hover:text-red-600 dark:hover:text-red-600 dark:text-white"></i>
              </div>
            ))}
          </div> : <section className="text-center"> <NoProductsFound/>
                  <Link to={`/products`}>
                   <button className="btn">Check Our Products</button>  
                  </Link>
                  </section>}
          </section>
          </>
        }
      </>
    )
}