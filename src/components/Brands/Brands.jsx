import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Spinner from "../Spinner/Spinner";
import { Helmet } from "react-helmet";

export default function Brands(){

    function getBrands(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }
    
    const {data , isLoading} =  useQuery({
        queryKey: ['Brands'],
        queryFn: getBrands,
        select: (data)=> data.data.data
    })


return (
    <>
       <Helmet>
   <title>Brands</title>
     </Helmet>
    {isLoading?<Spinner/>: <section className="pt-3">
      <section className="row">
        {data?.map(brand=> <div key={brand._id} className="w-full md:w-1/2 md:px-5 lg:w-1/4 xl:w-1/5">
         <div className="brand text-center">
            <img src={brand?.image} className="w-full" alt={brand?.name} />
            <h2 className="text-green-600 font-bold text-2xl">{brand?.name}</h2>
            
         </div>
       
        </div>)}
       
      </section>
    </section>}
   
    
    </>
)
}