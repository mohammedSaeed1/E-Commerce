import errorImg from '../../assets/images/error.svg'
import { Helmet } from "react-helmet";

export default function ErrorPage(){
    
return (
    <>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <section className='flex justify-center items-center m-auto pt-10'>
    <img src={errorImg} className='w-[40%]' alt="ErrorPage NotFound" />
    </section>
    </>
)
}