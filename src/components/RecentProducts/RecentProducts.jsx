import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner.jsx";
import useProducts from "../../Hooks/useProducts.jsx";
import useAddProducts from "../../Hooks/useAddProducts.jsx";
import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext.jsx";
import useRemoveFromWishlist from "../../Hooks/useRemoveFromWishlist.jsx";
import useAddToWishlist from "../../Hooks/useAddToWishlist.jsx";

export default function RecentProducts() {
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAllProducts } = useProducts();
  const { addProduct } = useAddProducts();
  const { removeFromWishlist } = useRemoveFromWishlist();
  const { addToWishlist } = useAddToWishlist();
  const {userWishlistProductsById} = useContext(WishlistContext);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const { data } = await getAllProducts();
    setProducts(data?.data);
    setIsLoading(false);
  }
 

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="dark:bg-[#1B1B1F]">
          <div className="row">
            {products?.map((product) => (
              <div
                key={product.id}
                className="w-full md:w-1/2 md:px-5 lg:w-1/4 xl:w-1/5 p-4 group text-center relative"
              >
                {userWishlistProductsById.includes(product.id) ? (
                  <i
                    onClick={() => removeFromWishlist(product.id)}
                    className="fa-solid fa-heart text-red-600 absolute top-4 right-4 text-xl rounded-md cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => addToWishlist(product.id)}
                    className="fa-regular fa-heart text-black absolute top-4 right-4 text-xl rounded-md cursor-pointer"
                  ></i>
                )}

                <Link
                  to={`/productdetails/${product?.id}/${product?.category?.name}`}
                >
                  <div className="product ">
                    <img
                      className="w-full"
                      src={product?.imageCover}
                      alt={product?.title}
                    />
                    <h2 className="text-center text-green-500 font-semibold ">
                      {product?.category?.name}
                    </h2>
                    <h3 className="text-center py-0.5 text-slate-950 dark:text-white ">
                      {product?.title.slice(0, 20)}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold dark:text-white">
                        {product?.price} EGP
                      </span>
                      <span className="font-semibold dark:text-white">
                        {product?.ratingsAverage}
                        <i className="fas fa-star text-yellow-300"></i>
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => addProduct(product.id)}
                  className="btn mt-1 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 duration-1000"
                >
                  Add to Cart <i className="fa-solid ps-2 fa-cart-plus"></i>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
