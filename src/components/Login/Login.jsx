import { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik"
import * as Yup from 'yup'
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


export default function Login(){

    const {setUserToken , setUserName , setUserEmail} =  useContext(userContext);

    const [mailError , setMailError] = useState('');
    const [isLoading , setIsloading] = useState(false);
    const navigate =  useNavigate();
    const [showPassword, setShowPassword] = useState(false);
   
    async function handleLogin(values){
        setIsloading(true);
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
       .then(response=>{        
        localStorage.setItem('userToken',response.data.token);
        localStorage.setItem('userName',response.data.user.name);
        localStorage.setItem('userEmail',response.data.user.email);
        setUserToken(response.data.token);
        setUserName(response.data.user.name);
        setUserEmail(response.data.user.email);        
        navigate('/');
        setIsloading(false);      
        toast.success("Login is successfully")    
       })
       .catch(error=>{
        setMailError(error.response.data.message);
         setIsloading(false);
       })
    }
     
    const validationSchema = Yup.object().shape({
        email:Yup.string().email('Email must be valid ').required('Email is required'),
        password: Yup.string().required("Password is required")
    })
     
    const formik = useFormik({initialValues:{
    email:'',
    password:''
  },
  onSubmit: handleLogin,
  validationSchema
}
)

return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
      <section className="py-14 md:py-[97px] px-5 sm:px-0">
       <form className="max-w-lg mx-auto py-5" onSubmit={formik.handleSubmit} >        
     {mailError&&<div className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{mailError}</div>} 
       <h2 className="text-2xl font-bold text-green-600 pt-1">Login Now</h2>
        
 <div className="relative z-0 w-full mb-5 group mt-3">
      <input  type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-green-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email</label>
  </div>
    {formik.errors.email && formik.touched.email?<div className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.email}</div>:null}

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

<button type="submit" className="bg-green-600 py-2 px-3 text-white rounded-md"> {isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:'Login'}</button>
<Link to={`/recoveremail`} className="text-green-600 ml-4 hover:underline ">Forgot Password ?</Link>
  <p className="pt-2 dark:text-white">Don't have an account ? <Link className="text-green-600 ms-1 font- underline" to={`/register`}>Register now</Link></p>
  </form>
      </section>
    
    </>
)


}