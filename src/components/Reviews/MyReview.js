import React from 'react';
import styled from 'styled-components';
import { RiStarFill, RiStarLine } from 'react-icons/ri';
import { Hr } from '..';

const MyReview = ({ reviews }) => {
  return (
    <>
      <ReviewStyle>
        <div className='my-review-container'>
          <div className='content'>
            {reviews.map((review, index) => {
              const { comment, date, product, rating, user } = review;
              const { image, name } = product;

              return (
                <div key={index}>
                  <div className='review_content'>
                    <div className='my-review-image'>
                      <img src={user.profileimage} alt={user.name} />
                    </div>
                    <div className='user-review'>
                      <p className='name'>{user.name}</p>
                      <div className='stars'>
                        {rating === 5 && (
                          <>
                            <div className='stars'>
                              <RiStarFill />
                              <RiStarFill />
                              <RiStarFill />
                              <RiStarFill />
                              <RiStarFill />
                            </div>
                          </>
                        )}
                        {rating === 4 && (
                          <>
                            <div className='stars'>
                              <RiStarFill />
                              <RiStarFill />
                              <RiStarFill />
                              <RiStarFill />
                              <RiStarLine />
                            </div>
                          </>
                        )}
                        {rating === 3 && (
                          <>
                            <div className='stars'>
                              <RiStarFill />
                              <RiStarFill />
                              <RiStarFill />

                              <RiStarLine />
                              <RiStarLine />
                            </div>
                          </>
                        )}
                        {rating === 2 && (
                          <>
                            <div className='stars'>
                              <RiStarFill />

                              <RiStarFill />
                              <RiStarLine />
                              <RiStarLine />
                              <RiStarLine />
                            </div>
                          </>
                        )}
                        {rating === 1 && (
                          <>
                            <div className='stars'>
                              <RiStarFill />
                              <RiStarLine />
                              <RiStarLine />
                              <RiStarLine />
                              <RiStarLine />
                            </div>
                          </>
                        )}
                      </div>

                      <span className='date'>{date}</span>
                      <p className='user-single-review'>{comment}</p>
                      <div className='product'>
                        <img src={image} alt={name} />
                        <p>{name}</p>
                      </div>
                    </div>
                  </div>
                  <Hr />
                </div>
              );
            })}
          </div>
        </div>
      </ReviewStyle>
    </>
  );
};

const ReviewStyle = styled.section`
  .review_content {
    display: flex;
    flex-direction: row;
    gap: 1.2rem;
    margin: 2rem 0;
  }

  .my-review-image {
    img {
      width: 40px;
      height: 40px;
    }
  }
  .user-review {
    p {
      margin-bottom: 0.5rem;
    }
    .stars {
      color: var(--clr-price);
    }
    .date {
      font-size: 0.7rem;
    }
    .product {
      padding: 0.5rem;
      background-color: var(--clr-light-grey5);
      display: inline-flex;
      gap: 1rem;
      align-items: center;

      img {
        height: 50px;
        width: 50px;
      }
    }
  }
  @media (min-width: 768px) {
    .product {
      background-color: var(--clr-light-grey2) !important;
    }
  }
`;

export default MyReview;
