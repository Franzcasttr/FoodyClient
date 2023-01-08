import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar, SingleFooter } from '../components';
import Policy from '../components/Policy/Policy';
import { BiArrowBack } from 'react-icons/bi';

const PolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Nav>
        <Navbar />
      </Nav>
      <SharedRating>
        <div className='back'>
          <Link to='/profile'>
            <BiArrowBack />
          </Link>
          <p>Privacy Policy</p>
        </div>
      </SharedRating>

      <Policy />
      <SingleFooter />
    </>
  );
};

const Nav = styled.div`
  top: 0;
  position: sticky;

  background-color: white !important;

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

export default PolicyPage;
