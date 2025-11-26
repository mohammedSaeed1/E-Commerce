import errorImg from '../../assets/images/error.svg'
import { Helmet } from "react-helmet-async";

export default function ErrorPage(){
    
return (
    <>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <section className='flex justify-center items-center m-auto py-32 md:py-20'>
    <img src={errorImg} className='w-[70%] md:w-[40%]' alt="ErrorPage NotFound" />
    </section>
    </>
)
}