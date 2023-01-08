import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';
import { getuserorder } from '../actions/user';
import Order from '../components/Order/Order';
import { Link } from 'react-router-dom';
import { SingleFooter } from '../components';
import Navbar from '../components/Navbar/Navbar';
import Loading from '../utils/Loading';

const OrderPage = () => {
  const { order, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuserorder());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Nav>
        <Navbar />
        <div className='title section-center'>
          <h3>My purchased</h3>
        </div>
      </Nav>
      <section className='section-center'>
        <SharedRating className='section-center'>
          <div className='back'>
            <Link to='/profile'>
              <BiArrowBack />
            </Link>
            <p>My Purchases</p>
          </div>
        </SharedRating>

        <Order order={order} />
      </section>
      <SingleFooter />
    </>
  );
};

const Nav = styled.div`
  z-index: 999;
  .title {
    padding: 1rem;
    background-color: var(--clr-secondary-3);
    margin-bottom: 5rem;
    h3 {
      color: white;
    }
  }
  @media (max-width: 765px) {
    display: none;
    .title {
      display: none;
    }
  }
`;
const SharedRating = styled.section`
  position: sticky !important;
  top: 0;
  z-index: 999;
  margin-bottom: 2rem;
  padding: 1rem;
  border-bottom: 1px solid var(--clr-light-grey);
  background-color: var(--background);

  .back {
    font-size: 1.5rem;
    display: inline-flex;
    gap: 1.5rem;
    p {
      font-size: 1.1rem;
    }
  }
  .navigation-bar {
    display: flex;
    gap: 2rem;

    .link {
      color: #000;
      font-size: 1rem;
    }
  }
  .active {
    border-bottom: 2px solid var(--clr-primary-1);
  }
  @media (min-width: 768px) {
    position: static !important;
    background-color: white;
    display: none;
  }
`;
export default OrderPage;
