import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"
import { Helmet } from "react-helmet";

export default function ResetPassword(){
    

   const navigate =  useNavigate();
  const [isLoading , setIsloading] = useState(false);
   

const validationSchema = Yup.object().shape({
  email: Yup.string().email(`Invalid Email`).required(`Email is required`),
  newPassword: Yup.string().required(`Password is required`)
})


 const formik =  useFormik({
    initialValues:{
      email:``,
      newPassword:``
    },
    onSubmit: resetPassword,
    validationSchema

})

  function resetPassword(){
        setIsloading(true);

    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        email : formik.values.email ,
         newPassword : formik.values.newPassword
      }
    )
    .then(()=> {
      toast.success(`Reset Password is correct`);
      navigate(`/login`);
        setIsloading(false);
    }
    )
    .catch(error => {
      toast.error(error.response.data.message);
        setIsloading(false);
    }
    )
  }

return (
    <>
     <Helmet>
   <title>Reset Password</title>
     </Helmet>
  <section className=" dark:bg-gray-900 pt-3 sm:pt-0">
  <div className="flex flex-col items-center justify-center px-6  mx-auto md:h-screen lg:py-0">
 
    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
      <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Change Password
      </h2>
      <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={formik.handleSubmit}>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border focus:outline-green-600 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Mail.."/>
        </div>
         {formik.errors.email && formik.touched.email?<div class="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.email}</div>:null}
        
        
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
          <input type="password" name="newPassword" id="password" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="••••••••" className="bg-gray-50 border focus:outline-green-600 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"/>
        </div>
         {formik.errors.newPassword && formik.touched.newPassword ?<div class="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.newPassword}</div>:null}


        <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:'Reset Password'}</button>

      </form>
    </div>
  </div>
</section>

    
    </>
)

}