import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import styled from 'styled-components';
import CheckoutTotal from '../Checkout/CheckoutTotal';

const Payment = (props) => {
  const { address } = useSelector((state) => state.user);

  const { cartItems } = useSelector((state) => state.cart);
  const [cart, setCart] = useState(cartItems);

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  const handleClick = (e) => {
    props.confirmAddress && props.setOpenStripe(true);
    props.setSelectPayment('card');
    props.confirmAddress && props.cardConfirmOrder();
  };
  return (
    <PaymentWrapper>
      <h4>select payment method</h4>
      <div className='payment-container'>
        <div className='cash-on-delivery'>
          <div className='image-cod'>
            <div className='img-cod'>
              <img
                src='https://res.cloudinary.com/dyvisacbu/image/upload/v1646121190/food-denx/logo/COD_dllux2.png'
                alt='COD'
              />
              <p>Cash On Delivery</p>
            </div>
            <input
              type='radio'
              name='cod'
              value='cod'
              onClick={(e) => props.setSelectPayment(e.target.value)}
            />
          </div>
          <hr />
          <span>Pay when you recieve</span>
        </div>

        <div className='card-payment' onClick={handleClick}>
          <div className='image-cod'>
            <div className='img-cod'>
              <img
                src='https://res.cloudinary.com/dyvisacbu/image/upload/v1646121191/food-denx/logo/creditcard_x1dvzc.png'
                alt='COD'
              />
              <p>Credit / Debit Card</p>
            </div>
          </div>
          <hr />
          <span>Tap to add card</span>
        </div>
        {/* order summary */}
        <CheckoutTotal
          totalItems={Object.keys(cart).reduce((amount, key) => {
            return amount + cart[key].amount;
          }, 0)}
          totalPrice={Object.keys(cart).reduce((totalPrice, key) => {
            const { price, amount } = cart[key];
            return totalPrice + amount * price;
          }, 0)}
        />
        {
          props.confirmAddress && props.selectPayment === 'cod' ? (
            <p onClick={props.confirmOrder} className='checkout-btn'>
              Place Order
            </p>
          ) : null
          //  (
          //   <>
          //     {' '}
          //     <div className='checkout-btn'>
          //       <span>Please Select Address To Continue</span>
          //     </div>{' '}
          //   </>
          // )
        }
      </div>
    </PaymentWrapper>
  );
};

const PaymentWrapper = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  box-shadow: var(--dark-shadow);
  border-radius: 19px;
  width: 100%;
  height: max-content;
  margin-bottom: 1rem;
  h4 {
    font-weight: normal;
    margin-bottom: 1rem;
  }
  .payment-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    .cash-on-delivery {
      padding: 1rem;
      box-shadow: var(--light-shadow);
      .image-cod {
        display: flex;
        justify-content: space-between;

        .img-cod {
          display: grid;
          grid-template-columns: 50px 170px;
          img {
            width: 30px;
            height: 30px;
          }
          p {
            font-size: 1rem;
          }
        }
      }
    }
    .card-payment {
      padding: 1rem;
      box-shadow: var(--light-shadow);
      cursor: pointer;
      .image-cod {
        display: flex;
        justify-content: space-between;

        .img-cod {
          display: grid;
          grid-template-columns: 50px 170px;
          img {
            width: 30px;
            height: 30px;
          }
          p {
            font-size: 1rem;
          }
        }
      }
    }
  }
  .subtotal {
    display: flex;
    justify-content: space-between;

    .total {
      font-weight: bold;
    }
  }
  .checkout-btn {
    font-size: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background: var(--clr-primary-1);
    color: #fff;
    cursor: pointer;
    text-align: center;
  }

  .checkout-btn {
    display: none;
  }

  @media (min-width: 768px) {
    h4 {
      font-size: 1rem;
    }
    .order-total {
      font-weight: bold;
    }
  }
  .checkout-btn {
    display: block;
  }
  /* @media (min-width: 1024px) {
    width: 60%;
  } */
`;
export default Payment;
