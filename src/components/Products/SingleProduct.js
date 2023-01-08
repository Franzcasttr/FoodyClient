import React, { useEffect } from 'react';

import { MdArrowBackIos } from 'react-icons/md';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import styled from 'styled-components';
import { GoPlus } from 'react-icons/go';
import { FiMinus } from 'react-icons/fi';
import { AddtoCart, Reviews, Webcart } from '..';
import formatPrice from '../../utils/helper';
import { useDispatch } from 'react-redux';
import { DECREASE, INCREASE } from '../../Constants/actionTypes';
import SingleStarRating from '../Ratings/SingleRating';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  addtofavorite,
  getuserfavorite,
  removefromfavorite,
} from '../../actions/user';
import Loading from '../../utils/Loading';

const SingleProduct = ({ product }) => {
  const { user } = useSelector((state) => state.auth);
  const { favorites, loading } = useSelector((state) => state.user);

  const {
    _id: id,
    name,
    image,
    price,
    desc,
    brand,
    inventory,
    amount,
    averageRating,
  } = product;

  const [wishlist, setWishlist] = useState(false);

  const dispatch = useDispatch();

  const handleclick = () => {
    return window.history.back(-1);
  };

  useEffect(() => {
    if (user) {
      dispatch(getuserfavorite());
    }
  }, [user]);

  let productId;
  const productfilter = favorites.filter((item) => item.product._id === id);
  productfilter.map((item) => {
    productId = item.product._id;
    return item;
  });

  const addToWishlist = (id) => {
    const product = {
      product: id,
    };
    setWishlist(!wishlist);

    if (wishlist) {
      dispatch(removefromfavorite(id));
    } else {
      dispatch(addtofavorite(product));
    }
  };

  if (loading) {
    return (
      <div className='section-center'>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Wrapper className='section-center'>
        <div className='back'>
          <p className='go-back' onClick={handleclick}>
            <MdArrowBackIos />
          </p>
        </div>

        <div className='container'>
          <div className='image-container'>
            <div className='main'>
              <div className='bg-image'>
                <img src={image} className='image1' alt={name} />
              </div>
              <div className='bg-text'>
                <img src={image} className='image2' alt={name} />
              </div>
            </div>
          </div>
          {/* description */}
          <div className='desc'>
            <h2>{name}</h2>
            <div className='ratings'>
              {averageRating ? (
                <>
                  <div className='flex'>
                    <SingleStarRating value={averageRating} />
                    <div className='averageRating'>
                      <span>{averageRating}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className='flex'>
                  <SingleStarRating value={averageRating} />
                </div>
              )}
              {user && (
                <div className='heart' onClick={() => addToWishlist(id)}>
                  {wishlist ? (
                    <>
                      {productId !== id && setWishlist(false)}
                      <AiFillHeart />
                    </>
                  ) : (
                    <>
                      {productId === id && setWishlist(true)}
                      <AiOutlineHeart />
                    </>
                  )}
                </div>
              )}
            </div>
            <h3>{formatPrice(price)}</h3>
            <p>{desc}</p>

            <p className='info'>
              <span>Availability:</span>
              {inventory > 0 ? 'In Stock' : 'Out Of Stock'}
            </p>
            <p className='info'>
              <span>Stock:</span>
              {inventory}
            </p>
            <p className='info'>
              <span>Brand:</span>
              {brand}
            </p>
            <hr
              style={{
                backgroundColor: '#000',
                height: '0.1rem',
                marginBottom: '2rem',
                opacity: 0.1,
              }}
            />
            {inventory > 0 && (
              <div className='quantity'>
                <span>Quantity:</span>
                <div className='quantity-text'>
                  <div
                    className='add'
                    onClick={() =>
                      dispatch({ type: DECREASE, payload: { id } })
                    }>
                    <FiMinus />
                  </div>
                  <div className='amount'>{amount}</div>
                  <div
                    className='add'
                    onClick={() =>
                      dispatch({ type: INCREASE, payload: { id } })
                    }>
                    <GoPlus />
                  </div>
                </div>
              </div>
            )}

            {inventory > 0 && <Webcart products={product} />}
          </div>
          {/* end description */}
        </div>
        <Reviews averageRating={averageRating} />
      </Wrapper>
      {inventory > 0 && <AddtoCart products={product} />}
    </>
  );
};

const Wrapper = styled.section`
  p {
    font-size: 1rem;
    margin-bottom: 0.5rem !important;
  }
  .back {
    margin-left: 1rem;
    margin-top: 1rem;
    opacity: 0.7;
    position: absolute;
    z-index: 999;

    .go-back {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      width: max-content;
      border: none;
      color: #fff;
      border-radius: 19px;
      background: #57cc99;
      font-size: 18px;
      color: #fff;
    }
  }
  .container {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin: 1rem 0;

    .main {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 3rem;
      border-radius: 2rem;
      box-shadow: var(--light-shadow);
      margin-bottom: 2rem;
      position: relative;
      background: linear-gradient(
        127.05deg,
        rgba(116, 253, 204, 0.5) -8.96%,
        rgba(0, 126, 242, 0.5) 140.9%
      );
      .bg-image {
        filter: blur(30px);
      }
      .image1 {
        margin-top: 3rem;
        width: 140px;
        height: 120px;
      }
      .bg-text {
        position: absolute;
      }
      .image2 {
        width: 150px;
        height: 150px;
      }
    }
    .desc {
      .ratings {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .flex {
          display: flex;
          align-items: center;

          gap: 0.7rem;
        }

        .averageRating {
          font-size: 1.2rem;
          span {
            color: var(--clr-price);
          }
        }
      }
      .heart {
        font-size: 2rem;
        color: var(--clr-red);
        cursor: pointer;
      }

      h3 {
        color: var(--clr-price);
        margin: 2rem 0;
      }
    }
    .info {
      text-transform: capitalize;
      display: grid;
      grid-template-columns: 125px 1fr;
      margin: 3rem 0;
    }
    .info span {
      font-weight: 700;
    }
    .quantity {
      display: grid;
      grid-template-columns: 125px 1fr;
      margin: 3rem 0;

      span {
        font-weight: bold;
        font-size: 1.2rem;
      }
      .quantity-text {
        font-weight: bold;
        display: flex;
        gap: 2rem;
        align-items: center;
      }
      .amount {
        font-size: 1.5rem;
      }

      .add {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.7rem;
        box-shadow: var(--dark-shadow);
        border-radius: 1rem;
        cursor: pointer;
      }
      .add:nth-child(3) {
        color: var(--clr-primary-1) !important;
      }
    }
  }
  @media (min-width: 768px) {
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
    }
    .back {
      display: none;
    }
    .main {
      height: 25rem;
    }
    .ratings {
      display: inline-flex !important;
      gap: 4rem;
    }
    .averageRating {
      font-size: 1.2rem !important;
    }
  }
`;
export default SingleProduct;
