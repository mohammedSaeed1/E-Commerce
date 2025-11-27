import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import useAddProducts from "../../Hooks/useAddProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Helmet } from "react-helmet-async";


export default function ProductDetails() {
  const [expanded, setExpanded] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRelatedProduct, setIsRelatedProduct] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const { id, categoryname } = useParams();
  const { addProduct } = useAddProducts();

  const getSpecificProduct = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProduct(data.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const getRelatedProducts = (page = 1) => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
      .then(({ data }) => {
        const filteredData = data.data.filter(
          (prod) => prod.category.name === categoryname && prod.id !== id
        );
        setRelatedProducts(filteredData);
        setIsRelatedProduct(filteredData.length > 0);
      });
  };

  useEffect(() => {
    getSpecificProduct();
    getRelatedProducts();
  }, [id, categoryname]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="dark:bg-gray-900 py-8">
          <div className="row flex flex-wrap justify-center items-start gap-8">
            <div className="md:w-1/4 w-full px-4">
              {product?.images?.length > 0 ? (
                <>
                  <Helmet>
                    <title>{product.title}</title>
                <meta name="description" content={product.description}/>
                  </Helmet>
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    loop
                    onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                  >
                    {product.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          className="w-full h-[300px] object-cover rounded-lg"
                          src={image}
                          alt={product?.title}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="flex justify-center mt-3 gap-2">
                    {product.images.map((_, index) => (
                      <span
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                          index === activeSlide
                            ? "bg-green-600"
                            : "bg-gray-400 dark:bg-gray-600"
                        }`}
                        onClick={() => setActiveSlide(index)}
                      ></span>
                    ))}
                  </div>
                </>
              ) : (
                <img
                  className="w-full h-[300px] object-cover rounded-lg"
                  src={product?.imageCover}
                  alt={product?.title}
                />
              )}
            </div>

            {/* Product Details */}
            <div className="md:w-3/4 px-4">
              <h2 className="font-semibold md:py-2 mt-4 md:mt-0 dark:text-white text-2xl">
                {product?.title}
              </h2>

              <p
                className={`text-slate-500 py-2 overflow-hidden transition-all duration-500 ${
                  expanded ? "max-h-96" : "max-h-24"
                }`}
              >
                {product?.description}
              </p>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-gray-400 font-semibold mt-1"
              >
                {expanded ? "Show Less" : "Read More"}
              </button>

              <h4 className="py-2 text-green-500 font-semibold">
                {product?.category?.name}
              </h4>
              <div className="flex justify-between items-center my-2">
                <span className="font-semibold dark:text-white">
                  {product?.price} EGP
                </span>
                <span className="font-semibold dark:text-white">
                  {product?.ratingsAverage}{" "}
                  <i className="fas fa-star text-yellow-300"></i>
                </span>
              </div>
              <button
                onClick={() => addProduct(product.id)}
                className="btn mt-4 w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Related Products */}
          {isRelatedProduct && (
            <>
              <h5 className="text-green-500 font-semibold text-2xl text-center mt-8">
                Related Products
              </h5>
              <div className="row flex flex-wrap justify-center gap-4 mt-4">
                {relatedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 p-4 group text-center"
                  >
                    <Link
                      to={`/productdetails/${prod?.id}/${prod?.category?.name}`}
                    >
                      <div className="product text-center">
                        <img
                          className="w-full h-[200px] object-cover rounded-lg"
                          src={prod?.imageCover}
                          alt={prod?.title}
                        />
                        <h2 className="text-center text-green-500 font-semibold">
                          {prod?.category?.name}
                        </h2>
                        <h3 className="text-center py-0.5 text-slate-950 dark:text-white">
                          {prod?.title.slice(0, 20)}
                        </h3>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold dark:text-white">
                            {prod?.price} EGP
                          </span>
                          <span className="font-semibold dark:text-white">
                            {prod?.ratingsAverage}{" "}
                            <i className="fas fa-star text-yellow-300"></i>
                          </span>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => addProduct(prod.id)}
                      className="btn mt-1 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 duration-1000 w-full"
                    >
                      Add to Cart <i className="fa-solid ps-2 fa-cart-plus"></i>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
