import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import CartEmpty from "../CartEmpty/CartEmpty";
import { Helmet } from "react-helmet";

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);

  const {
    getLoggedUserCart,
    updateCartQuantity,
    removeSpecificItem,
    clearCart,
    cartProducts,
    setCartProducts,
  } = useContext(CartContext);

  async function getUserCart() {
    const response = await getLoggedUserCart();
    setCartProducts(response.data.data);
    setIsLoading(false);
  }
  async function updateCart(productId, count) {
    const response = await updateCartQuantity(productId, count);
    setCartProducts(response.data.data);
  }

  async function removeItem(productId) {
    const response = await removeSpecificItem(productId);
    setCartProducts(response.data.data);
  }
  async function removeCart() {
    const response = await clearCart();
    setCartProducts(response.data.data);
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <>
       <Helmet>
   <title>Cart</title>
     </Helmet>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="bg-white py-8 antialiased dark:bg-[#1B1B1F]">
          <div className="mx-auto max-w-screen-xl px-4 ">
            <div className="text-center">
              <h2 className="md:text-3xl text-2xl font-serif  font-semibold text-green-600 dark:text-white border-b-4 border-green-600 inline ">
                Shopping Cart
              </h2>
            </div>
            {cartProducts?.totalCartPrice > 0 ? (
              <>
                <div className="text-center mt-5">
                  <i
                    onClick={() => removeCart()}
                    className="fa-solid fa-trash ps-2 cursor-pointer text-xl hover:text-red-600 dark:text-white"
                  ></i>
                </div>
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                  <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    <div className="space-y-6">
                      {cartProducts?.products.map((product) => (
                        <div
                          key={product._id}
                          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                        >
                          <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                            <img
                              className="h-32 w-32 "
                              src={product?.product?.imageCover}
                              alt={product?.product?.title}
                            />

                            <label htmlFor="counter-input" className="sr-only">
                              Choose quantity:
                            </label>
                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateCart(
                                      product.product.id,
                                      product.count - 1
                                    )
                                  }
                                  id="decrement-button"
                                  data-input-counter-decrement="counter-input"
                                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                >
                                  <svg
                                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 2"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M1 1h16"
                                    />
                                  </svg>
                                </button>
                                <input
                                  type="text"
                                  id="counter-input"
                                  data-input-counter
                                  className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                  value={product?.count}
                                />

                                <button
                                  onClick={() =>
                                    updateCart(
                                      product.product.id,
                                      product.count + 1
                                    )
                                  }
                                  type="button"
                                  id="increment-button"
                                  data-input-counter-increment="counter-input"
                                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                >
                                  <svg
                                    className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M9 1v16M1 9h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-gray-900 dark:text-white">
                                  {" "}
                                  {product?.price} L.E{" "}
                                </p>
                              </div>
                            </div>

                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                              <Link
                                to={`/productdetails/${product?.product?.id}/${product?.product?.category?.name}`}
                                className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                              >
                                {product?.product?.title}
                              </Link>

                              <div className="flex items-center gap-4">
                                <h3 className="font-medium dark:text-white">
                                  {" "}
                                  Category:{" "}
                                  <span className="block font-bold dark:text-green-600">
                                    {product?.product?.category?.name}
                                  </span>{" "}
                                </h3>

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeItem(product?.product?.id)
                                  }
                                  className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                >
                                  <svg
                                    className="me-1.5 h-5 w-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M6 18 17.94 6M18 18 6.06 6"
                                    />
                                  </svg>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {cartProducts?.totalCartPrice > 1 ? (
                        <div className="text-center ">
                          <span className="text-xl font-bold text-slate-800 w-1/4  dark:text-white ">
                            Total Cart Price: {cartProducts?.totalCartPrice} EGP
                          </span>
                          <Link to={`/payment`}>
                            <button className=" w-full md:w-3/4 mt-3 duration-500 hover:bg-green-600  text-white bg-slate-300  px-6 py-2 rounded-lg dark:bg-green-600">
                              Proceed to Checkout
                              <i className="fa-solid fa-credit-card ml-3"></i>
                            </button>
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <section className="text-center">
                <CartEmpty />
                <Link to={`/products`}>
                  <button className="btn">Check Our Products</button>
                </Link>
              </section>
            )}
          </div>
        </section>
      )}
    </>
  );
}
