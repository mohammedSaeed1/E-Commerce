import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts"
import Spinner from "../Spinner/Spinner";
import useAddProducts from "../../Hooks/useAddProducts";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function Products(){
  
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const {getAllProducts} = useProducts();    
  const {addProduct} = useAddProducts();

  useEffect(() => {
    getProducts(page);
  }, [page]); 

   
    async function getProducts(pageNumber = 1){
       setIsLoading(true);
       const {data} = await getAllProducts(pageNumber);

       setProducts(data?.data);
       setFilteredProducts(data?.data);
       setNumberOfPages(data?.metadata?.numberOfPages || 1);
       setIsLoading(false);
    }
    function searchProduct(value){
        const filteredData = products.filter(product => 
          product.description.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filteredData);
    }

return (
    <>
     <Helmet>
   <title>Products</title>
     </Helmet>

      {isLoading ? (
        <Spinner />
      ) : (
        <section>

          <div className="mx-auto text-center">
            <input 
              onKeyUp={(e) => searchProduct(e.target.value)}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-green-600 focus:border-green-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:text-white w-[90%] md:w-1/2 mt-10"
              placeholder="Search by Product Category or Name"
            />
          </div>

          <div className="row">
            {filteredProducts?.map((product) => (
              <div key={product.id} className=" w-full md:w-1/2 md:px-5 lg:w-1/4 xl:w-1/5 p-4 group text-center">
                <Link to={`/productdetails/${product?.id}/${product?.category?.name}`}>
                  <div className="product">
                    <img className="w-full" src={product?.imageCover} alt={product?.title} />
                    <h2 className="text-center text-green-500 font-semibold ">
                      {product?.category?.name}
                    </h2>
                    <h3 className="text-center py-0.5 text-slate-950 dark:text-white ">
                      {product?.title.slice(0,22)}
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

                <button
                  onClick={() => addProduct(product.id)}
                  className="btn mt-1 opacity-0 group-hover:opacity-100 translate-y-10 
                  group-hover:translate-y-0 duration-1000"
                >
                  Add to Cart <i className="fa-solid ps-2 fa-cart-plus"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center pb-2">
            <nav className="inline-flex items-center gap-2 text-gray-700 dark:text-white">

              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className={`px-3 py-1 border rounded-lg 
                ${page === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
              >
                Previous
              </button>

              {Array.from({ length: numberOfPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-3 py-1 border rounded-lg 
                  ${page === num ? "bg-green-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                >
                  {num}
                </button>
              ))}

              <button
                disabled={page === numberOfPages}
                onClick={() => setPage(p => p + 1)}
                className={`px-3 py-1 border rounded-lg 
                ${page === numberOfPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
              >
                Next
              </button>

            </nav>
          </div>

        </section>
      )}
    </>
);

}
