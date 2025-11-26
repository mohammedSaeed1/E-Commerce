import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { userContext } from "../../Context/UserContext";
import * as Yup from 'yup'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Password(){
    
 const {userToken} =  useContext(userContext);
  const [isLoading , setIsloading] = useState(false);
   const navigate = useNavigate();

 const validationSchema = Yup.object().shape({
       currentPassword: Yup.string().required('CurrentPassword is required'),
       password: Yup.string().min(8,'Min chars is 8').max(30,'Max chars is 30').required("Password is required"),
        rePassword:Yup.string().oneOf([Yup.ref('password')],'rePassword must be matched with password').required('rePassword is required')
    })

const formik = useFormik({
initialValues:{
  currentPassword: ``,
  password: `` ,
  rePassword: ``
},
onSubmit: updateUserPassword ,
validationSchema
})

function updateUserPassword(){
        setIsloading(true);
  axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,{
    currentPassword: formik.values.currentPassword ,
    password: formik.values.password,
    rePassword: formik.values.rePassword
  },{
     headers : {
      token : userToken
     }
  })
  .then(response =>{
    if(response.data.message === 'success'){
      toast.success(`Your Password is updated`);
      navigate(`/login`);
    setIsloading(false);
    }    
  }
  )
  .catch(error =>{
      if(error.response.data.message === 'fail'){
        toast.error(error.response.data.errors.msg);
        setIsloading(false);
      }
  }
  )
}

return (
   <>    
   <Helmet>
      <title>Change Password</title>
    </Helmet>
   <section className="py-10 px-5 sm:px-0">
          <form className="max-w-lg mx-auto py-5" onSubmit={formik.handleSubmit} >        
       <h2 className="text-2xl font-bold text-green-600 pt-1">Updata your Password</h2>
       
  <div className="relative z-0 w-full mb-5 group mt-3">
      <input type="password"  value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} name="currentPassword" id="currentPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="Your Password" />
  </div>
    {formik.errors.currentPassword && formik.touched.currentPassword?<div className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.currentPassword}</div>:null}
  
 <div className="relative z-0 w-full mb-5 group mt-3">
      <input type="password" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="Your new Password " />
  </div>
    {formik.errors.password&& formik.touched.password?<div className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.password}</div>:null}
  <div className="relative z-0 w-full mb-5 group mt-3">
      <input type="password" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="Repeat Your new Password " />
  </div>
    {formik.errors.rePassword && formik.touched.rePassword?<div className="p-2.5 mb-1 text-sm text-red-800 rounded-lg  bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.rePassword}</div>:null}


<button type="submit"  className="bg-green-600 py-2 px-3 text-white rounded-md"> {isLoading?<i className="fa-solid fa-spinner fa-spin"></i>:'Change Password'}</button>

  </form>
   </section>
    </>
)
}