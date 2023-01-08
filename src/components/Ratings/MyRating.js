import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Hr } from '..';
import { getuserorder } from '../../actions/user';
import ReviewModal from '../Modal/ReviewModal';

const MyRating = () => {
  const { order } = useSelector((state) => state.user);
  const [reviewModal, setReviewModal] = useState(false);
  const [itemsId, setitemsId] = useState();
  const [product, setProduct] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuserorder());
  }, [dispatch]);

  const items = order.map((item) => {
    return item.items[0];
  });

  const filter = items.filter((item) => item.toRate === 'rate');

  if (filter.length < 1) {
    return <div>You have no order to rate</div>;
  }

  if (order.length < 1) {
    return <div>You have no order to rate</div>;
  }

  const handleClick = ({ itemsId, product }) => {
    setReviewModal(true);
    setitemsId(itemsId);
    setProduct(product);
  };

  const cotainerVariant = {
    hidden: {
      opacity: 0,
    },
    vissible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        delay: 0.3,
      },
    },
  };

  const contentVariant = {
    hidden: {
      scale: 0,
    },
    vissible: {
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      scale: 0,
      transition: {
        delay: 0.3,
      },
    },
  };

  const maintContentVariant = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    vissible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <MyRatings>
      <AnimatePresence>
        {reviewModal && (
          <>
            <motion.div
              variants={cotainerVariant}
              initial='hidden'
              animate='vissible'
              exit='exit'
              className='modal-backdrop'
              onClick={() => setReviewModal(false)}></motion.div>
            <motion.div
              variants={contentVariant}
              initial='hidden'
              animate='vissible'
              exit='exit'
              className='modal-content'>
              <motion.div
                variants={maintContentVariant}
                initial='hidden'
                animate='vissible'
                exit='exit'
                className='main-content'>
                <ReviewModal
                  itemsId={itemsId}
                  product={product}
                  setReviewModal={setReviewModal}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className='to-rate'>
        {order.map((item, index) => {
          const { items } = item;

          return (
            <div key={index}>
              {items.map((item, index) => {
                const { _id, productId, toRate } = item;

                return (
                  <article key={index}>
                    {toRate === 'rate' && (
                      <>
                        <div className='content'>
                          <img src={productId.image} alt={productId.name} />

                          <div className='content-text-actions'>
                            <p>{productId.name}</p>
                            <span>{productId.tag}</span>
                            <div className='button'>
                              <button
                                onClick={() =>
                                  handleClick({
                                    itemsId: _id,
                                    product: productId._id,
                                  })
                                }>
                                Review
                              </button>
                            </div>
                          </div>
                        </div>
                        <Hr />
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          );
        })}
      </div>
    </MyRatings>
  );
};

const MyRatings = styled.div`
  .modal-backdrop {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }

  .modal-content {
    position: fixed;
    width: 90vw;

    max-width: 1170px;

    padding: 1.5rem;
    box-shadow: var(--lightblue-shadow);
    background: var(--background);
    z-index: 999;
    top: 2rem;
    color: #fff;
    font-size: 1rem;

    border-radius: 10px;

    .main-content {
      display: grid;
      place-items: center;
      text-align: center;
    }
  }

  article {
    margin: 1.2rem 0;

    .content {
      margin: 1.2rem 0;
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 2rem;

      img {
        width: 99.89px;
        height: 79.43px;
      }

      .content-text-actions {
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        width: 100%;
        p {
          margin-bottom: 0.2rem;
          font-weight: 700;
        }
        span {
          margin-bottom: 2rem;
        }
        .button {
          display: flex;
          justify-content: right;
          button {
            border: none;
            background: none;
            border: 1px solid var(--clr-red);
            border-radius: 1rem;
            padding: 0.5rem;
            color: var(--clr-red);
            font-size: 1rem;
            cursor: pointer;
          }
        }
      }
    }
  }
  @media (min-width: 768px) {
    .modal-content {
      background: white;
    }
  }
`;

export default MyRating;
