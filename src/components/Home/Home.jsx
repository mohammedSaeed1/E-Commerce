import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import RecentProducts from './../RecentProducts/RecentProducts';
import { Helmet } from 'react-helmet';
export default function Home(){
    
return (
     <>
     <Helmet>
   <title>Home</title>
     </Helmet>

     <section>
     <MainSlider/>
     <CategoriesSlider/>
     <RecentProducts/>
     </section>
     </>
)
}