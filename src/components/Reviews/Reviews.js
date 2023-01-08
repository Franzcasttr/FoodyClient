import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ProductReview } from '../../ProductreviewsData';
// import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri';
import StarRating from './StarRating';
import Hr from '../Lines/Hr';

const Reviews = ({ averageRating }) => {
  // console.log(averageRating);
  const { product_reviews } = useSelector((state) => state.product);

  if (product_reviews.length === 0) {
    return (
      <Review>
        <p className='review-title'>
          Reviews & Ratings ({product_reviews.length})
        </p>
        <p className='no-review'>This product has no reviews yet.</p>
      </Review>
    );
  }

  return (
    <Review>
      <div className='review-container'>
        <p className='review-title'>
          Reviews & Ratings ({product_reviews.length})
        </p>
        {averageRating && (
          <>
            <div className='ratings'>
              <div className='averageRating'>
                <span>{averageRating}</span>
                /5
              </div>
              <StarRating value={averageRating} />
            </div>
            <div className='product-reviews'>
              <p>Product Reviews</p>
              <Hr />
            </div>
          </>
        )}

        {product_reviews.map((reviews, index) => {
          const { comment, user, rating, date } = reviews;

          return (
            <article key={index}>
              <div className='content'>
                <div className='image'>
                  <img src={user.profileimage} alt={user.name} />
                </div>
                <div className='user-review'>
                  <p className='name'>{user.name}</p>
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

                  {/* <img src={stars} alt='stars' /> */}
                  <p className='user-single-review'>{comment}</p>
                  <p className='date'>{date}</p>
                </div>
              </div>
              <hr
                style={{
                  backgroundColor: '#000',
                  height: '0.1rem',
                  marginBottom: '2rem',
                  opacity: 0.1,
                }}
              />
              <p className='top'></p>
            </article>
          );
        })}
      </div>
    </Review>
  );
};

const Review = styled.section`
  margin-top: 4rem !important;
  .no-review {
    color: var(--clr-light-grey3);
  }
  h3 {
    margin-bottom: 2rem;
  }
  .review-container {
    display: flex;
    flex-direction: column;
  }
  .review-title {
    font-size: 1.2rem;
    font-weight: bold;
    padding-bottom: 1.5rem;
  }

  .ratings {
    padding: 1rem;
    background-color: var(--clr-light-grey4);
    margin-bottom: 1.5rem;
    border-radius: 10px;
    display: flex;
    gap: 0.5rem;
    align-items: center;

    .averageRating {
      color: var(--clr-light-grey3);
      span {
        font-size: 1.2rem;
      }
    }
  }
  .product-reviews {
    margin: 2rem 0;
    margin-bottom: 4rem;
    p {
      font-weight: 700;
      font-size: 1.2rem;
    }
  }
  .content {
    display: inline-flex;
    gap: 1rem;
  }
  .image {
    img {
      width: 40px;
      height: 40px;
    }
  }
  .user-review {
    img {
      width: 70px;
      height: 15px;
    }

    .stars {
      font-size: 1rem;
      color: var(--clr-price);
    }

    .user-single-review {
      font-size: 1rem;
      margin: 1rem auto;
    }

    .date {
      font-size: 0.8rem;
      color: var(--clr-date);
      margin-top: 1.5rem;
    }
  }

  @media (min-width: 768px) {
    margin-top: 6rem !important;

    .ratings {
      padding: 2rem;
      display: block;
      gap: 1.5rem;

      .averageRating {
        font-size: 2.4rem;

        span {
          font-size: 4rem;
        }
      }
    }
    .image {
      img {
        width: 50px;
        height: 50px;
      }
    }
    .name {
      font-size: 1.3rem;
    }
    .user-review {
      img {
        width: 70px;
        height: 15px;
      }

      .user-single-review {
        font-size: 1rem;
        margin: 1rem auto;
      }
    }
    .top {
      margin-top: 5rem;
    }
  }
`;
export default Reviews;
