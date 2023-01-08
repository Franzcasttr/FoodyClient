import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { addcart, clearcart, removeCart } from '../actions/cart';
import {
  CartItems,
  Hr,
  MobileCartFooter,
  Navbar,
  SingleFooter,
} from '../components';
import CartToital from '../components/Cart/CartToital';
import { ImCross } from 'react-icons/im';
import Loading from '../utils/Loading';
import { fetchallproduct } from '../actions/product';
import RelatedProducts from '../components/Products/RelatedProduct';
import { BiArrowBack } from 'react-icons/bi';

const CartPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { cartItems, loading } = useSelector((state) => state.cart);

  const [cart, setCart] = useState(cartItems);
  const [confirmation, setConfirmation] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    dispatch(fetchallproduct());
  }, [dispatch]);

  const quantityInc = (id, qty) => {
    const { name, image, price } = cart[id];
    dispatch(addcart({ id, name, image, price }, 1));
  };

  const quantityDec = (id, qty) => {
    const { name, image, price } = cart[id];
    dispatch(addcart({ id, name, image, price }, -1));
  };
  const removeItem = (id) => {
    dispatch(removeCart({ productId: id }));
  };

  const handleClick = () => {
    dispatch(clearcart());
  };

  const goBack = () => {
    return window.history.back(-1);
  };

  if (loading) {
    return (
      <div className='section-center'>
        <Loading />
      </div>
    );
  }

  if (Object.keys(cart).length < 1) {
    return (
      <EmptyWrapper>
        <Navbar />
        <div className='empty'>
          <h2>Your cart is empty!</h2>
          <Link to='/' className='go-shopping'>
            Continue Shopping
          </Link>
        </div>
      </EmptyWrapper>
    );
  }

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
    <>
      <Nav>
        <Navbar />
      </Nav>
      <SharedRating>
        <div className='back'>
          <div onClick={goBack}>
            <BiArrowBack />
          </div>
          <p>Shopping Cart</p>
        </div>
      </SharedRating>
      <Wrapper className='section-center'>
        <div className='confirmation'>
          <AnimatePresence>
            {confirmation && (
              <>
                <motion.div
                  variants={cotainerVariant}
                  initial='hidden'
                  animate='vissible'
                  exit='exit'
                  className='modal-backdrop'
                  onClick={() => setConfirmation(false)}></motion.div>
                <motion.div
                  variants={contentVariant}
                  initial='hidden'
                  animate='vissible'
                  exit='exit'
                  className='content'>
                  <div className='close' onClick={() => setConfirmation(false)}>
                    <ImCross />
                  </div>
                  <motion.div
                    variants={maintContentVariant}
                    initial='hidden'
                    animate='vissible'
                    exit='exit'
                    className='main-content'>
                    <p>Are you sure you want to clear your cart?</p>
                    <button onClick={handleClick}>Remove all</button>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <div className='container'>
          <h2 className='title'>My cart</h2>
          <div className='parent'>
            <div className='first-container'>
              <div>
                {Object.keys(cart).map((key, index) => (
                  <CartItems
                    key={index}
                    cartItem={cart[key]}
                    quantityInc={quantityInc}
                    quantityDec={quantityDec}
                    removeItem={removeItem}
                  />
                ))}
                <div className='clear-cart'>
                  <Link to='/' className='continue-shopping'>
                    Continue Shoping
                  </Link>

                  <button onClick={() => setConfirmation(true)}>
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            <div className='proceed'>
              <CartToital
                totalItems={Object.keys(cart).reduce((amount, key) => {
                  return amount + cart[key].amount;
                }, 0)}
                totalPrice={Object.keys(cart).reduce((totalPrice, key) => {
                  const { price, amount } = cart[key];
                  return totalPrice + amount * price;
                }, 0)}
              />
            </div>
          </div>
        </div>
      </Wrapper>
      <MoreProduct className='section-center'>
        <Hr />
        <div className='more-products'>
          <RelatedProducts />
        </div>
      </MoreProduct>

      <MobileCartFooter
        totalPrice={Object.keys(cart).reduce((totalPrice, key) => {
          const { price, amount } = cart[key];
          return totalPrice + amount * price;
        }, 0)}
      />
      <SingleFooter />
    </>
  );
};
const MoreProduct = styled.section`
  margin-top: 3rem;
`;

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
  position: fixed !important;
  top: 0;
  z-index: 400;
  width: 100%;

  /* margin-bottom: 2rem; */
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

const EmptyWrapper = styled.section`
  .empty {
    display: grid;
    place-items: center;

    h2 {
      font-size: 25px;
      color: var(--clr-primary-1);
      margin: 2rem auto;
    }
    .go-shopping {
      color: #fff;
      padding: 1rem;
      background: var(--clr-primary-2);
      border-radius: 1rem;
    }

    @media (min-width: 768px) {
      .empty {
        h2 {
          font-size: 35px !important;

          margin: 5rem auto !important;
        }
        .go-shopping {
          font-size: 1rem;
          cursor: pointer;
        }
      }
    }

    @media (min-width: 1024px) {
      .empty {
        h2 {
          font-size: 5rem !important;
        }
      }
    }
  }
`;

const Wrapper = styled.section`
  margin-top: 7rem;
  .cart-nav {
    display: none;
  }
  .title {
    margin: 3rem auto;
  }

  .container {
    height: 100%;
  }

  h2 {
    display: grid;
    place-items: center;
    margin-bottom: 2rem;
    color: var(--clr-primary-1);
  }
  article {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    place-items: center;
    margin-bottom: 2rem;
    box-shadow: var(--light-shadow);
    padding: 1rem;
    height: 10rem;
    border-radius: 1rem;

    img {
      width: 99.89px;
      height: 79.43px;
    }
    h4 {
      font-size: 16px;
    }
    p {
      font-weight: bold;
      margin-bottom: 0;
    }
    .quantity {
      display: flex;
      gap: 1rem;
      font-size: 17px;
      margin: 1rem auto;

      .add {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        box-shadow: var(--dark-shadow);
        border-radius: 1rem;
        cursor: pointer;
      }
      .add:nth-child(3) {
        color: var(--clr-primary-1) !important;
      }
    }
    .remove {
      font-size: 2rem;
      color: var(--clr-red);
      background: none;
      border: none;
      cursor: pointer;
    }
  }
  .clear-cart {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    .continue-shopping {
      font-size: 1rem;
      padding: 0.5rem;
      border-radius: 0.2rem;
      border: none;
      background: var(--clr-primary-2);
      color: #fff;
      cursor: pointer;
    }
    button {
      font-size: 1rem;
      padding: 0.5rem;
      border-radius: 0.2rem;
      border: none;
      background: var(--clr-clear);
      color: #fff;
      cursor: pointer;
    }
  }
  .proceed {
    display: none;
  }

  .confirmation {
    /* position: relative; */
    .content {
      position: fixed;
      width: 90vw;
      height: fit-content;
      max-width: 1170px;
      margin: auto;
      top: 10rem;
      padding: 2rem;
      box-shadow: var(--lightblue-shadow);
      background: var(--clr-light-grey3);
      z-index: 999;

      color: #fff;
      font-size: 1rem;

      border-radius: 10px;

      .main-content {
        display: grid;
        place-items: center;
        text-align: center;

        p {
          font-size: 1.1rem;
        }
      }

      button {
        padding: 1rem;
        color: #fff;
        border-radius: 10px;
        background-color: var(--red-light);
        border: none;
        font-size: 1.02rem;
        cursor: pointer;
      }
    }
  }

  .modal-backdrop {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 888;
  }
  .close {
    display: flex;

    justify-content: end;
    margin-bottom: 0.5rem;
    color: red;

    cursor: pointer;
    color: var(--red-light);
  }

  @media (min-width: 768px) {
    margin-top: 0;
    .cart-nav {
      display: block !important;
    }
    .content {
      /* display: grid;
      place-items: center; */
      width: 90vw !important;
      height: fit-content !important;

      margin: auto;
    }
    .parent {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }
    .proceed {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        margin: 0;
      }

      .total-amount {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 2rem;
        padding: 1rem;
        box-shadow: var(--shadow);
      }
      .sub-total {
        display: flex;
        justify-content: space-between;
      }
      .proceed-btn {
        display: flex;
        justify-content: center;

        .btn-checkout {
          font-size: 1rem;
          padding: 1rem;
          border-radius: 1rem;

          background: var(--clr-primary-1);
          color: #fff;
          cursor: pointer;
        }
      }
    }

    article {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr);

      img {
        width: 100px !important;
        height: 100px !important;
      }
      h4 {
        font-size: 20px;
      }
      p {
        font-size: 20px;
      }
      .price-container {
        display: flex;
        align-items: center !important;
        gap: 3rem;
      }
    }
  }
  @media (min-width: 1024px) {
    .content {
      left: 30%;
      top: 50%;
      transform: translate(-50%, -10%);
      width: 30vw !important;
      height: 20vh !important;
    }

    article {
      h4 {
        font-size: 1.5rem;
      }
      p {
        font-size: 1.5rem;
      }
      .price-container {
        display: flex;
        align-items: center !important;
        gap: 3rem;
      }
    }
  }
`;

export default CartPage;
