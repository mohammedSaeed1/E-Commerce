import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from 'react-router-dom';
import Spinner from "../Spinner/Spinner";
import { Helmet } from "react-helmet";


export default function Categories(){
    
const [categories , setCategories] = useState([]);
const [isLoading , setIsLoading] = useState(true);

useEffect(() => {
 getCategories();
},[])
 

function getCategories(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then(({data}) => {
    setIsLoading(false);
    setCategories(data.data);
    }
  )
    .catch(error => error)
}

return (
    <>
       <Helmet>
   <title>Categories</title>
     </Helmet>
     
{isLoading ? <Spinner/> :<section className=" py-8 antialiased md:py-16 mt-5">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
      <h2 className="md:text-3xl text-2xl font-serif font-semibold text-green-600 dark:text-white border-b-4 border-green-600 inline">Shop by Category</h2>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {categories?.map(category =>  <Link to={`/productscategory/${category.name}`} key={category._id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img src={category.image} className="w-12 h-12" alt={category.name} />
        <h2 className="text-sm font-medium text-green-600 dark:text-white">{category?.name}</h2>
      </Link> )}
     
    </div>
  </div>
</section> }
    
    
    </>
)

}