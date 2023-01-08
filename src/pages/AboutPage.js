import React, { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar, SingleFooter } from '../components';
import About from '../components/About/About';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper className='section-center'>
      <Nav>
        <Navbar />
      </Nav>
      <SharedRating>
        <div className='back'>
          <Link to='/profile'>
            <BiArrowBack />
          </Link>
          <p>About us</p>
        </div>
      </SharedRating>
      <About />
      <SingleFooter />
    </Wrapper>
  );
};

const Nav = styled.div`
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

const Wrapper = styled.section`
  .nav {
    top: 0;
    position: sticky;
    background-color: var(--background);
  }
  @media (min-width: 768px) {
    .nav {
      background-color: white !important;
    }
  }
`;

export default AboutPage;
