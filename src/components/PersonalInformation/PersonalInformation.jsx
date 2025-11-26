import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { userContext } from "../../Context/UserContext";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function PersonalInformation() {
  const { userToken, userName, userEmail } = useContext(userContext);
  const [isLoading, setIsloading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Min number of characters is 2")
      .max(20, "Max number of characters is 20")
      .required("Name is required"),
    email: Yup.string()
      .email("Email must be valid ")
      .required("Email is required"),
    phone: Yup.string()
      .matches(
        /^(02)?(010|011|012|015)[0-9]{8}$/,
        "Phone must be an egyptain number"
      )
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: userName,
      email: userEmail,
      phone: ``,
    },
    enableReinitialize: true,
    onSubmit: updateUserData,
    validationSchema,
  });

  function updateUserData() {
    setIsloading(true);
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        {
          name: formik.values.name,
          email: formik.values.email,
          phone: formik.values.phone,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((response) => {
        if (response.data.message === "success") {
          toast.success(`Your Personal Data is updated`);
        }
        setIsloading(false);
      })
      .catch((error) => {
        if (error.response.data.message === "fail") {
          toast.error(error.response.data.errors.msg);
        }
        setIsloading(false);
      });
  }

  return (
    <>
    <Helmet>
      <title>Personal Information</title>
    </Helmet>
      <section className="py-10 px-5 sm:px-0">
        <form className="max-w-lg mx-auto py-5" onSubmit={formik.handleSubmit}>
          <h2 className="text-2xl font-bold text-green-600 pt-1">
            Your Personal Information
          </h2>

          <div className="relative z-0 w-full mb-5 group mt-3">
            <input
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.name}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group mt-3">
            <input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group mt-3">
            <input
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          ) : null}

          <button
            type="submit"
            className="bg-green-600 py-2 px-3 text-white rounded-md"
          >
            {" "}
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Update Info"
            )}
          </button>
        </form>
      </section>
    </>
  );
}
