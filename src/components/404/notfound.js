import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '..';

const Notfound = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <div className='empty'>
          <h1>We're Sorry!</h1>
          <p>The item you search is not found</p>
          <Link to='/' className='go-back'>
            Go Back
          </Link>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  .empty {
    display: grid;
    place-items: center;

    h1 {
      font-size: 25px;
      color: var(--clr-primary-1);
      margin: 2rem auto;
    }
    .go-back {
      color: #fff;
      padding: 1rem;
      background: var(--clr-primary-2);
      border-radius: 1rem;
      cursor: pointer;
    }
  }
  @media (min-width: 768px) {
    h1 {
      font-size: 3rem !important;
    }
    p {
      font-size: 1rem;
    }
  }
`;
export default Notfound;
