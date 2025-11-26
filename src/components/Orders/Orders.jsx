import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Spinner from "./../Spinner/Spinner";
import { Helmet } from "react-helmet-async";


export default function Orders() {

const userToken = localStorage.getItem(`userToken`);
  const { id } = jwtDecode(userToken);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getUserOrders() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then(({ data }) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => {
        return error;
      });
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
       <Helmet>
   <title>Orders</title>
     </Helmet>
      {isLoading ?  <Spinner /> : <section className="bg-white py-8 antialiased dark:bg-[#1B1B1F] md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              {orders.length > 0 ?  <>
                  <div className="gap-4 sm:flex sm:items-center text-center sm:justify-between">
                    <h2 className="text-4xl font-serif font-semibold text-green-600 dark:text-white border-b-4 border-green-600 inline">
                      My orders
                    </h2>
                  </div>
                  <div className="mt-6 flow-root sm:mt-8">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {orders?.map((order) => (
                        <div
                          key={order.id}
                          className="flex lg:block flex-wrap  gap-y-4 py-3"
                        >
                          <div className="flex gap-y-4 py-6 flex-wrap border-b-2 border-green-500">
                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt className="text-base font-bolder text-gray-500 dark:text-gray-400">
                                Order ID:
                              </dt>
                              <dd className="mt-1.5 text-base font-bold text-gray-900 dark:text-white">
                                {order?.id}
                              </dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                Date:
                              </dt>
                              <dd className="mt-1.5 text-base font-bold text-gray-900 dark:text-white">
                                {order?.createdAt.slice(0, 10)}
                              </dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                Total Price:
                              </dt>
                              <dd className="mt-1.5 text-base font-bold text-gray-900 dark:text-white">
                                {order?.totalOrderPrice} L.E
                              </dd>
                            </dl>

                            <dl className="w-1/2  sm:w-1/4 lg:w-auto lg:flex-1">
                              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                Status:
                              </dt>
                              <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                {order?.isPaid ? (
                                  <span className="bg-green-500 rounded-full px-2.5  text-white">
                                    Paid
                                  </span>
                                ) : (
                                  <span className="bg-red-500 rounded-full px-2.5 text-white ">
                                    UnPaid
                                  </span>
                                )}
                              </dd>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4  lg:w-auto lg:flex-1">
                              <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                Payment Method:
                              </dt>
                              <dd className="mt-1.5 text-base font-bold text-gray-900 dark:text-white">
                                {order?.paymentMethodType}
                              </dd>
                            </dl>
                          </div>

                          <div className="product flex flex-wrap">
                            {order?.cartItems.map((product) => (
                              <div
                                key={product._id}
                                className="md:flex md:w-1/3 lg:w-1/4"
                              >
                                <div className="product border-gray-300 border mx-5 my-3 px-4  text-center">
                                  <img
                                    src={product?.product.imageCover}
                                    className="w-full"
                                    alt={product?.product.title}
                                  />
                                  <h2 className="font-semibold dark:text-white">
                                    {product?.product?.title.slice(0, 60)}
                                  </h2>
                                  <div className="flex justify-between pb-2 pt-1">
                                    <span className="font-semibold underline dark:text-white">
                                      Count: {product?.count}
                                    </span>
                                    <span className="font-bold  text-green-600">
                                      {product?.price} L.E
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </> :   <section className="text-center">
                  <h3 className="md:text-3xl text-2xl py-28 font-bold text-green-600">
                    No Orders yet
                  </h3>
                </section> 
              }
            </div>
          </div>
        </section>
      }
    </>
  );
}
