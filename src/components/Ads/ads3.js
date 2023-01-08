import React from 'react';
import styled from 'styled-components';

const ads3 = () => {
  return (
    <Wrapper>
      <img
        src='https://res.cloudinary.com/dyvisacbu/image/upload/v1644919931/food-denx/ads/soup_bf25nn.png'
        alt='ads3'
      />
      <h3>Healthy soup</h3>
      <p>
        If you're in the mood for warming, cozy comfort food that's also a
        quick, easy dinner recipe, there's no better option than a hearty bowl
        of soup (possibly with a slice of freshly baked no-knead bread)
      </p>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 1rem;
  box-shadow: var(--dark-shadow);
  background: var(--clr-secondary-1);
  border-radius: 1rem;
  color: #fff;
  text-align: center;

  p {
    display: none;
  }
  img {
    text-align: center;
    margin-bottom: 1rem;
  }
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding: 1rem 5rem !important;
    h3 {
      font-size: 36px;
      margin-top: 4rem;
    }
  }
`;

export default ads3;
