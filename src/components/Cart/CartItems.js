import { GoPlus } from 'react-icons/go';
import { FiMinus } from 'react-icons/fi';
import { IoMdTrash } from 'react-icons/io';
import styled from 'styled-components';

import formatPrice from '../../utils/helper';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const CartItems = (props) => {
  const [amount, setAmount] = useState(props.cartItem.amount);
  const [confirmation, setConfirmation] = useState(false);
  const { id, name, image, price } = props.cartItem;
  // console.log(id);

  const quantityIncrement = () => {
    setAmount(amount + 1);
    props.quantityInc(id, amount + 1);
  };

  const quantityDecrement = () => {
    if (amount <= 1) return;
    setAmount(amount - 1);
    props.quantityDec(id, amount - 1);
  };

  const handleClick = () => {
    props.removeItem(id);
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
    <>
      <Wrapper>
        <AnimatePresence>
          {confirmation && (
            <>
              <motion.div
                variants={cotainerVariant}
                initial='hidden'
                animate='vissible'
                exit='exit'
                className='modal-backdrop'></motion.div>
              <motion.div
                variants={contentVariant}
                initial='hidden'
                animate='vissible'
                exit='exit'
                className='content'>
                <motion.div
                  variants={maintContentVariant}
                  initial='hidden'
                  animate='vissible'
                  exit='exit'
                  className='main-content'>
                  <p>Are you sure you want to remove?</p>
                  <div className='actions'>
                    <button
                      className='cancel'
                      onClick={() => setConfirmation(false)}>
                      Cancel
                    </button>
                    <button className='delete' onClick={handleClick}>
                      Remove
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <article>
          <div className='image-container'>
            <img src={image} alt={name} />
          </div>
          <div className='price-container'>
            <h5>{name}</h5>
            <h5>{formatPrice(price)}</h5>
            <div className='quantity'>
              <div className='add' onClick={quantityDecrement}>
                <FiMinus />
              </div>
              <span className='amount'>{amount}</span>
              <div className='add' onClick={quantityIncrement}>
                <GoPlus />
              </div>
            </div>
          </div>
          <button className='remove' onClick={() => setConfirmation(true)}>
            <IoMdTrash />
          </button>
        </article>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .modal-backdrop {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .content {
    position: fixed;
    width: 90vw;

    max-width: 1170px;

    padding: 1.5rem;
    box-shadow: var(--lightblue-shadow);
    background: var(--clr-light-grey3);
    z-index: 999;
    top: 10rem;
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

    .actions {
      display: flex;
      gap: 2rem;

      button {
        border: none;
        font-size: 1.02rem;
        cursor: pointer;
      }
      .cancel {
        padding: 1rem;
        color: #000;
        border-radius: 10px;
        background-color: var(--clr-light-grey2);
      }
      .delete {
        padding: 1rem;
        color: #fff;
        border-radius: 10px;
        background-color: var(--red-light);
      }
    }
  }

  .container {
    height: 100%;
  }
  .container2 {
    height: 100vh;
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
      /* font-size: 17px; */
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
    display: flex;
    flex-direction: column;

    justify-content: space-between;

    .sub-total {
      display: flex;
      justify-content: space-between;
    }
    .proceed-btn {
      display: flex;
      justify-content: right;

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
  @media (max-height: 915px) {
    .container {
      min-height: 100vh;
    }
  }
  @media (min-width: 768px) {
    .content {
      top: 20% !important;
      height: fit-content;
    }
    /* left: 35%;
      top: 30% !important;
      transform: translate(-50%, -50%);
      width: 35vw !important;
    } */
    article {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr);

      img {
        width: 100px !important;
        height: 100px !important;
      }

      .price-container {
        display: flex;
        align-items: center !important;
        gap: 3rem;
      }
      .quantity {
        /* font-size: 18px !important; */
      }
    }
  }
  @media (min-width: 1024px) {
    /* .content {
      width: 30vw !important;
    } */
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

export default CartItems;
