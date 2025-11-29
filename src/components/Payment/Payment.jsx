import { useFormik } from "formik";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";

export default function Payment() {


   

  const { checkOut, cartId, createCashOrder } = useContext(CartContext);
  const { numCartItems, totalCartPrice, setNumCartItems, setTotalCartPrice } =
    useContext(CartContext);

  async function handleCheckout(cartId, url, shippingAddress) {
    const response = await checkOut(cartId, url, shippingAddress);
    if (response.data.status === "success") {
      window.location.href = response.data.session.url;
      setNumCartItems(0);
      setTotalCartPrice(0);
    }
  }
  async function handleCashOrder(cartId, shippingAddress) {
    const response = await createCashOrder(cartId, shippingAddress);
    if (response.data.status === "success") {
      toast.success(`Order created Successfully`);
      setNumCartItems(0);
      setTotalCartPrice(0);
    }
  }

  const validationSchema = Yup.object().shape({
    details: Yup.string().required("Invalid Details"),
    phone: Yup.string().required("Phone is required"),
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: `card`,
    },
    onSubmit: (values) => {
      const { details, phone, city, paymentMethod } = values;
      if (paymentMethod === `cash`) {
        handleCashOrder(cartId, { details, phone, city });
      } else {
        handleCheckout(cartId, `https://mohamedsaeed-nine.vercel.app/`, {
          details,
          phone,
          city,
        });
      }
    },
    validationSchema,
  });

  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto max-w-screen-xl px-4 2xl:px-0"
        >
          <h2 className="text-2xl font-bold text-green-600 pt-1 py-5">
            Check Out Now
          </h2>
          <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            <li className="after:border-1 flex items-center text-green-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-green-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg
                  className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Cart
              </span>
            </li>
            <li className="after:border-1 flex items-center text-green-700 after:mx-6  dark:text-green-500   md:w-full ">
              <span className="flex items-center">
                <svg
                  className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Checkout
              </span>
            </li>
          </ol>
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Delivery Details
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      value={formik.values.details}
                      onChange={formik.handleChange}
                      name="details"
                      onBlur={formik.handleBlur}
                      className="block focus:outline-green-600 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                      placeholder="Details"
                    />
                  </div>
                  {formik.errors.details && formik.touched.details ? (
                    <div
                      className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {formik.errors.details}
                    </div>
                  ) : null}

                  <div>
                    <input
                      type="tel"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      name="phone"
                      onBlur={formik.handleBlur}
                      className="block focus:outline-green-600 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                      placeholder="Phone"
                    />
                  </div>
                  {formik.errors.phone && formik.touched.phone ? (
                    <div
                      className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {formik.errors.phone}
                    </div>
                  ) : null}

                  <div>
                    <input
                      type="text"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      name="city"
                      onBlur={formik.handleBlur}
                      className="block focus:outline-green-600 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-green-500 dark:focus:ring-green-500"
                      placeholder="City"
                    />
                  </div>
                  {formik.errors.city && formik.touched.city ? (
                    <div
                      className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {formik.errors.city}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Payment
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          value={`card`}
                          onChange={formik.handleChange}
                          checked={formik.values.paymentMethod === `card`}
                          id="credit-card"
                          aria-describedby="credit-card-text"
                          type="radio"
                          name="paymentMethod"
                          defaultValue
                          className="h-4 w-4 accent-green-600 border-gray-300 bg-white text-green-600  dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 "
                          defaultChecked
                        />
                      </div>
                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="credit-card"
                          className="font-medium leading-none text-gray-900 dark:text-white"
                        >
                          Credit Card
                        </label>
                        <p
                          id="credit-card-text"
                          className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                        >
                          Pay with your credit card
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          onChange={formik.handleChange}
                          value={`cash`}
                          checked={formik.values.paymentMethod === `cash`}
                          id="pay-on-delivery"
                          aria-describedby="pay-on-delivery-text"
                          type="radio"
                          name="paymentMethod"
                          defaultValue
                          className="accent-green-600 h-4 w-4 border-gray-300 bg-white text-green-600  dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 "
                        />
                      </div>
                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="pay-on-delivery"
                          className="font-medium leading-none text-gray-900 dark:text-white"
                        >
                          Payment on delivery
                        </label>
                        <p
                          id="pay-on-delivery-text"
                          className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                        >
                          pay cash
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div />
            </div>
            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Num Of Cart Items
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {numCartItems}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {totalCartPrice} L.E
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      {totalCartPrice} L.E
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none  dark:bg-green-600 dark:hover:bg-green-700 "
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
