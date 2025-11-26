import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik"
import * as Yup from 'yup'
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from 'react-hot-toast';
import { Helmet } from "react-helmet-async";


export default function Register(){

    const [mailError , setMailError] = useState('');
    const [isLoading , setIsloading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate =  useNavigate();
 
    async function handleRegister(values){
        setIsloading(true);
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
       .then(()=>{
           navigate('/login');
           toast.success("Email is created successfully")
           setIsloading(false);
       })
       .catch(error=>{
        setMailError(error.response.data.message);
         setIsloading(false);
       })
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(2,'Min number of characters is 2').max(20,'Max number of characters is 20').required('Name is required'),
        email:Yup.string().email('Email must be valid ').required('Email is required'),
        phone: Yup.string().matches(/^(02)?(010|011|012|015)[0-9]{8}$/,'Phone must be an egyptain number').required('Phone is required'),
        password: Yup.string().min(8,'Min chars is 8').max(30,'Max chars is 30').required("Password is required"),
        rePassword:Yup.string().oneOf([Yup.ref('password')],'rePassword must be matched with password').required('rePassword is required')
    })
    
    // function validateForm(values){
    //     let errors = {};
    //     if(!values.name)
    //         errors.name = "Name is not exist";
    //     else if(!/^[A-Z][A-Za-z]{3,20}$/.test(values.name))
    //         errors.name = 'Name must start with capital letter then chars from 3 to 20 chars';
    //     if(!values.email)
    //         errors.email = "Email is not exist";
    //        else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email))
    //         errors.email = 'Email is not valid';
    //     if(!values.phone)
    //         errors.phone = "Phone is not exist";
    //     else if(!/^(02)?(010|011|012|015)[0-9]{8}$/.test(values.phone))
    //         errors.phone = 'Phone must contain an 11 numbers';
    //      if(!values.password)
    //         errors.password = "Password is not exist";
    //     else if(!/^[A-Z0-9a-z]{6,}$/.test(values.password))
    //         errors.password = 'Password must be at least 6 chars or numbers';
    //     if(!values.rePassword)
    //         errors.rePassword = "rePassword is not exist";
    //     else if(values.password !== values.rePassword)
    //         errors.rePassword = 'Password is not match';

    //     return errors;
    // }
    
    const formik = useFormik({initialValues:{
    name:'',
    email:'',
    phone:'',
    password:'',
    rePassword:''
  },
  onSubmit: handleRegister,
  validationSchema
}
)

return (
    <> 
     <Helmet>
   <title>Register</title>
     </Helmet>

    <section className="py-10 px-5 sm:px-0">
       <form className="max-w-lg mx-auto py-5" onSubmit={formik.handleSubmit} >        
     {mailError&&<div className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{mailError}</div>} 
       <h2 className="text-2xl font-bold text-green-600 pt-1">Register Now</h2>
       
  <div className="relative z-0 w-full mb-5 group mt-3">
      <input type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Name</label>
  </div>
    {formik.errors.name && formik.touched.name?<div className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.name}</div>:null}
  
 <div className="relative z-0 w-full mb-5 group mt-3">
      <input type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email</label>
  </div>
    {formik.errors.email && formik.touched.email?<div className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.email}</div>:null}
  <div className="relative z-0 w-full mb-5 group mt-3">
      <input type="tel" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Phone</label>
  </div>
    {formik.errors.phone && formik.touched.phone?<div className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.phone}</div>:null}

  <div className="relative z-0 w-full mb-5 group mt-3">
      <input type={showPassword ? "text" : "password"} value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Password</label>
        <span
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <EyeIcon className="h-5 w-5 text-gray-500" />
        )}
      </span>
  </div>
   {formik.errors.password && formik.touched.password?<div className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.password}</div>:null}

  <div className="relative z-0 w-full mb-5 group mt-3">
      <input type={showPassword ? "text" : "password"} value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Retype your Password</label>
        <span
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <EyeIcon className="h-5 w-5 text-gray-500" />
        )}
      </span>
  </div>
   {formik.errors.rePassword && formik.touched.rePassword?<div className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.rePassword}</div>:null}

<button type="submit" className="bg-green-600 py-2 px-3 text-white rounded-md"> {isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:'Submit'}</button>
  <p className="pt-2 dark:text-white">You have an account ? <Link className="text-green-600 ms-1 font-medium underline" to={`/login`}>Login now</Link></p>

  </form>
    </section>
      
    
    </>
)
}