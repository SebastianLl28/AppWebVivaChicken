import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { styled, alpha } from "@mui/material/styles";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
// import styled from 'styled-components';

const SwipeSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]} //lazu
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
    >
      <SwiperSlide>
        <Image src="./landingPage/food1.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="./landingPage/food2.jpg" alt="" loading="lazy" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="./landingPage/food3.jpg" alt="" loading="lazy" />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwipeSlider;

const Image = styled("img")`
  width: 100%;
  height: auto;
  /* max-height: 800px; */
`;
