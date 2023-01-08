import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchCategory } from '../actions/category';
import { fetchallproduct } from '../actions/product';

import {
  Ads,
  Ads2,
  Ads3,
  Bestoffer,
  Categories,
  CTA,
  Exlusive,
  Footer,
  More,
  Navbar,
  // Footer,
} from '../components';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchallproduct());
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <Wrapper>
      <Navbar />
      <div className='section-center'>
        <div className='desktop-view'>
          <CTA />
        </div>

        <Categories />
        <Ads />
        <Exlusive />
        <Ads2 />
        <Bestoffer />
        <Ads3 />
        <More />
      </div>
      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  font-size: 18px;
  .desktop-view {
    display: none;
  }
  @media (min-width: 768px) {
    .desktop-view {
      display: block;
    }
  }
`;
export default Home;
