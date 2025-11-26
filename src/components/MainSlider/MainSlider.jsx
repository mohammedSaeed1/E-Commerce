import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import SliderImg1 from '../../assets/images/images/slider-image-1.jpeg';
import SliderImg2 from '../../assets/images/images/slider-image-3.jpeg';
import SliderImg3 from '../../assets/images/images/slider-image-2.jpeg';
import Img1 from '../../assets/images/images/grocery-banner-2.jpeg';
import Img2 from '../../assets/images/images/grocery-banner.png';

export default function MainSlider() {
  return (
    <header className="pt-7 w-full sm:w-[90%] m-auto dark:bg-[#1B1B1F]">
      <section className="flex flex-col sm:flex-row gap-3 sm:gap-0">

        <div className="w-full sm:w-3/4 dark:text-white">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 2500 }}
            loop={true}
            speed={1000}
            pagination={{ clickable: true }}
            className="custom-pagination"
          >
            <SwiperSlide>
              <img
                src={SliderImg1}
                className="w-full h-[200px] sm:h-[300px] object-cover rounded-xl"
                alt="Vegetables Fruits"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={SliderImg2}
                className="w-full h-[200px] sm:h-[300px] object-cover rounded-xl"
                alt="Cookies LASTA Cokoladni"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={Img1}
                className="w-full h-[200px] sm:h-[300px] object-cover rounded-xl"
                alt="Baker Toast Bread"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="w-full sm:w-1/4 flex flex-col gap-3 sm:gap-0">

          <img
            src={SliderImg3}
            className="w-full h-[120px] sm:h-[150px] object-cover rounded-xl sm:rounded-none sm:rounded-t-xl"
            alt="Wafer Rolls Cream"
          />

          <img
            src={Img2}
            className="w-full h-[120px] sm:h-[150px] object-cover rounded-xl sm:rounded-none sm:rounded-b-xl"
            alt="Vegetables Fruits"
          />

        </div>

      </section>
    </header>
  );
}
