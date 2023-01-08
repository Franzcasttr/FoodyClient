import React from 'react';
import styled from 'styled-components';
import MyRating from '../components/Ratings/MyRating';

const RatingPage = () => {
  return (
    <Ratings className='section-center'>
      <MyRating />
    </Ratings>
  );
};

const Ratings = styled.section``;

export default RatingPage;
