import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => setCategories(data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="w-full sm:w-[90%] mx-auto py-6">
      <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
        Shop Popular Categories
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        spaceBetween={15}
        breakpoints={{
          0: { slidesPerView: 1, centeredSlides: true },
          480: { slidesPerView: 1.1, centeredSlides: true },
          768: { slidesPerView: 2.5 },
          992: { slidesPerView: 4 },  
          1200: { slidesPerView: 5 }, 
          1400: { slidesPerView: 6 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="group bg-white dark:bg-[#2a2a31] rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-105">
              <div
                className="
                  relative overflow-hidden rounded-t-2xl
                  mx-auto
                  w-[70%] md:w-full     
                 h-[300px] md:h-[200px] 2xl:h-[250px] 
                "
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-green-600 transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
