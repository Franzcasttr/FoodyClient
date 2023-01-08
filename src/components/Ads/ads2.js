import React from 'react';
import styled from 'styled-components';

const ads2 = () => {
  return (
    <Wrapper>
      <div className='text'>
        <h4>
          Recommended
          <br /> Product
        </h4>
        <p>We recommend the best product for you.</p>
      </div>
      <img
        src='https://res.cloudinary.com/dyvisacbu/image/upload/v1644881517/food-denx/ads/overlayads_cyaa6x.png'
        alt='food-denx-ads-2'
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .text {
    position: absolute;
    color: #fff;
    padding: 1rem;
    line-height: 1px;

    p {
      font-size: 12px;
    }
  }

  img {
    border-radius: 0.5rem;
    width: 100%;
    height: 114.99px;
  }
  @media (min-width: 768px) {
    .text {
      h4 {
        font-size: 3rem;
      }
      line-height: 3rem !important;

      p {
        font-size: 18px;
      }
    }

    img {
      height: 220px;
      object-fit: cover;
    }
  }
  @media (min-width: 1024px) {
    .text {
      padding: 3rem !important;
      h4 {
        font-size: 3rem;
      }
      line-height: 3rem !important;

      p {
        font-size: 18px;
      }
    }

    img {
      height: 250px;
      object-fit: cover;
    }
  }
`;
export default ads2;
