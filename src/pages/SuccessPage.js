import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Success } from '../components';
import { REMOVE_CART } from '../Constants/actionTypes';

const SuccessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: REMOVE_CART });
  }, []);

  return (
    <SuccessWrapper className='section-center'>
      <div className='container'>
        <Success />
      </div>
      <h3>
        Your Order has been <br />
        accepted
      </h3>
      <p>
        Your items has been placed and is on <br />
        it's way to being processed
      </p>

      <Link to='/' className='go-back-btn'>
        Back to Home
      </Link>
    </SuccessWrapper>
  );
};

const SuccessWrapper = styled.section`
  display: grid;
  place-items: center;
  text-align: center;

  .go-back-btn {
    padding: 1rem;
    background: var(--clr-primary-1);
    font-size: 1rem;
    border-radius: 2rem;
    color: white;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

export default SuccessPage;
