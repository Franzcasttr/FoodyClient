import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import left from '../../assets/left.png';
const cta = () => {
  return (
    <Wrapper>
      <div className='container'>
        <div className='left'>
          <h2>$35</h2>
          <h1>Asian Cucumber Salad</h1>
          <p>
            Asian Cucumber Salad Recipe made with crunchy cucumber, onion, rice
            wine vinegar, and a few secret ingredients!
          </p>
          <Link to='/products' className='order-btn'>
            Order Now
          </Link>
        </div>
        <div className='right'>
          <img src={left} alt='food-denx-left' />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 3rem 0;
  .container {
    display: inline-flex;
    gap: 1rem;
  }
  h2 {
    color: var(--clr-primary-1);
  }
  h1 {
    font-size: 30px;
  }
  p {
    margin-bottom: 3rem;
    font-size: 14px;
    color: var(--clr-light-grey);
    margin-top: 1rem;
  }
  .order-btn {
    padding: 1rem;
    border-radius: 1rem;
    color: #fff;
    background: var(--clr-primary-1);
    font-size: 18px;
  }
  img {
    width: 400px;
    height: 400px;
    margin-top: -5rem;
  }
  @media (min-width: 1024px) {
    .container {
      gap: 2rem;
    }
    p {
      font-size: 18px !important;
      color: var(--clr-light-grey);
      margin-top: 2rem;
    }
    img {
      width: 600px;
      height: 600px;
      margin-top: -7rem;
    }
  }
`;
export default cta;
