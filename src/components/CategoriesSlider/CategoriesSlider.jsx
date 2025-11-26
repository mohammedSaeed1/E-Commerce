import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function CategoriesSlider() {
  
  const [categories, setCategories] = useState([]);
  const [isCategory, setIsCategory] = useState(false);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        setIsCategory(true);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="w-full sm:w-[90%] m-auto px-4 py-6 dark:bg-[#1B1B1F]">
      {isCategory && (
        <h2 className="py-3 font-semibold text-2xl text-green-600 tracking-wide">
          Shop Popular Categories
        </h2>
      )}

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2200 }}
        loop={true}
        speed={900}
        spaceBetween={20}
        breakpoints={{
          1400: { slidesPerView: 6 },
          1200: { slidesPerView: 5 },
          992: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          480: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {categories?.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="group bg-white dark:bg-[#2a2a31] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">

              <div className="w-full h-[240px] sm:h-[260px] md:h-[280px] lg:h-[300px] overflow-hidden rounded-t-2xl">
                <img
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-green-600 transition-colors duration-300">
                  {category?.name}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}