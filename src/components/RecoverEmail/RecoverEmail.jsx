import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import {useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from "react-helmet";


export default function RecoverEmail() {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`Enter a valid E-mail`)
      .required(`E-mail is required`),
  });

  const formik = useFormik({
    initialValues: {
      email: ``,
    },
    onSubmit: ForgotPassword,
    validationSchema,
  });

  function ForgotPassword() {
    setIsloading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        email: formik.values.email,
      })
      .then((response) => {
        toast.success(response.data.message);
        navigate(`/verificationcode`);
        setIsloading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsloading(false);
      });
  }

  return (
    <>
     <Helmet>
   <title>Recover Mail</title>
     </Helmet>
      <section class="py-10 px-5 sm:px-0 sm:py-0">
        <div class="flex flex-col items-center justify-center px-6 py-1 mx-auto md:h-screen lg:py-0">
          <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h1 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password ?
            </h1>
            <p class="font-light text-gray-500 dark:text-gray-400">
              Don't fret! Just type in your email and we will send you a code to
              reset your password!
            </p>
            <form
              class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Your Mail"
                />
              </div>
              {formik.errors.email && formik.touched.email ? (
                <div
                  className="p-2 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.email}
                </div>
              ) : null}
              <button
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
