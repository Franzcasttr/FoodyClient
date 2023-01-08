import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';

const ads = () => {
  return (
    <Wrapper>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'>
        <SwiperSlide>
          <img
            src='https://res.cloudinary.com/dyvisacbu/image/upload/v1644811300/food-denx/ads/ads3_ibkeuu.png'
            alt='food-denx-ads1'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://res.cloudinary.com/dyvisacbu/image/upload/v1644823749/food-denx/ads/1910.i029_1ads_2_d1zsi0.png'
            alt='food-denx-ads2'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='https://res.cloudinary.com/dyvisacbu/image/upload/v1644811302/food-denx/ads/ads2_n7lsnc.png'
            alt='food-denx-ads1'
          />
        </SwiperSlide>
      </Swiper>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100%;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (min-width: 768px) {
    margin: 1rem 0;
  }
  @media (min-width: 1024px) {
    .swiper-slide img {
      height: 246px !important;
    }
  }
`;
export default ads;
