import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GoPackage } from 'react-icons/go';
import { Hr } from '..';
import formatPrice from '../../utils/helper';
import ReviewModal from '../Modal/ReviewModal';
import { useDispatch } from 'react-redux';
import { addcart } from '../../actions/cart';
import { Link } from 'react-router-dom';

const Order = ({ order }) => {
  const [reviewModal, setReviewModal] = useState(false);
  const [itemsId, setitemsId] = useState();
  const [product, setProduct] = useState();

  const dispatch = useDispatch();

  if (order.length < 1) {
    return (
      <MyOrders>
        <div className='no-favorites'>
          <span>
            <GoPackage />
          </span>
          <p>You have no order to display</p>
          <Link to='/products' className='shop-now-btn'>
            Shop now
          </Link>
        </div>
      </MyOrders>
    );
  }

  const handleClick = ({ itemsId, product }) => {
    setReviewModal(true);
    setitemsId(itemsId);
    setProduct(product);
  };

  const buyAgain = ({ id, name, image, price, amount }) => {
    dispatch(addcart({ id, name, image, price, amount }));
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
    <MyOrders>
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
                const { _id, productId, toRate, purchasedQty } = item;

                return (
                  <article key={index}>
                    <>
                      <div className='content'>
                        <img src={productId.image} alt={productId.name} />

                        <div className='content-text-actions'>
                          <p>{productId.name}</p>
                          <span className='tag'>{productId.tag}</span>
                          <div className='price-tag'>
                            <span className='price'>
                              {formatPrice(productId.price)}
                            </span>
                            <span>Qty: {purchasedQty}</span>
                          </div>
                          <div className='totalPrice'>
                            <span>Total: </span>
                            <span className='total-price'>
                              {formatPrice(productId.price * purchasedQty)}
                            </span>
                          </div>
                          <div className='button'>
                            {toRate === 'rate' ? (
                              <button
                                onClick={() =>
                                  handleClick({
                                    itemsId: _id,
                                    product: productId._id,
                                  })
                                }>
                                Review
                              </button>
                            ) : (
                              <Link
                                to='/cart'
                                className='buy-again'
                                onClick={() =>
                                  buyAgain({
                                    id: productId._id,
                                    name: productId.name,
                                    image: productId.image,
                                    price: productId.price,
                                    amount: 1,
                                  })
                                }>
                                Buy Again
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                      <Hr />
                    </>
                  </article>
                );
              })}
            </div>
          );
        })}
      </div>
    </MyOrders>
  );
};

const MyOrders = styled.section`
  .no-favorites {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      font-size: 4rem;
      color: var(--clr-primary-green);
    }

    p {
      font-size: 1.2rem;
    }

    .shop-now-btn {
      padding: 0.5rem;
      background-color: var(--clr-primary-1);
      color: white;
      border-radius: 10px;
      width: 6rem;
      text-align: center;
    }
  }
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

        .tag {
          margin-bottom: 2rem;
        }
        .price-tag {
          display: flex;
          justify-content: space-between;

          /* gap: 1.4rem; */
          .price {
            margin-bottom: 2rem;
            font-weight: 700;
            color: var(--clr-price);
          }
        }
        .totalPrice {
          display: grid;
          place-content: end;
          grid-auto-flow: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
          .total-price {
            color: var(--clr-price);
            font-weight: 700;
          }
        }
        .button {
          display: flex;
          justify-content: right;
          button {
            cursor: pointer;
            border: none;
            background: none;
            border: 1px solid var(--clr-red);
            border-radius: 1rem;
            padding: 0.5rem;
            color: var(--clr-red);
            font-size: 1rem;
          }
          .buy-again {
            cursor: pointer;
            background: none;
            border: 1px solid var(--clr-red);
            border-radius: 1rem;
            padding: 0.5rem;
            color: var(--clr-red);
            font-size: 1rem;
          }
        }
      }
    }
  }
  @media (min-width: 768px) {
    .content {
      img {
        width: 80px !important;
        height: 100px !important;
      }
    }
    .content-text-actions {
      font-size: 1.2rem !important;

      .button {
        button {
          padding: 0.5rem !important;
          border-radius: 1.3rem !important;
          font-size: 1rem !important;
        }
        .buy-again {
          padding: 0.5rem !important;
          border-radius: 1.3rem !important;
          font-size: 1rem !important;
        }
      }
    }
  }
`;
export default Order;
