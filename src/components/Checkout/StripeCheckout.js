import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import styled from 'styled-components';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { ImCross } from 'react-icons/im';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// const createPaymentIntent = () => {
//   const [clientSecret, setClientSecret] = useState('');
//   //call for stripe backend
// };

export const CheckOutForm = () => {
  // const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/success',
      },
    });

    // if (payload) {
    //   dispatch({ type: ORDER_COMPLETE });
    // }

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
  };

  return (
    <>
      <form id='payment-form' onSubmit={handleSubmit}>
        <h4>Please fill up the details</h4>
        <PaymentElement id='payment-element' />
        <button disabled={isLoading || !stripe || !elements} id='submit'>
          <span id='button-text'>
            {isLoading ? (
              <div className='spinner' id='spinner'></div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id='payment-message'>{message}</div>}
      </form>
    </>
  );
};

const StripeCheckout = (props) => {
  const { clientSecret } = useSelector((state) => state.user);
  // console.log(props.confirmOrder());
  // const { shippingfee } = useSelector((state) => state.cart);

  // const dispatch = useDispatch();

  // const payload = {
  //   totalAmount: props.totalPrice + shippingfee,
  // };
  // useEffect(() => {
  //   dispatch(createpayment(payload));
  // }, []);

  const appearance = {
    theme: 'flat',
    variables: {
      colorPrimary: '#57cc99',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <div className='close' onClick={() => props.setOpenStripe(false)}>
        <ImCross className='close-modal' />
      </div>
      <Wrapper>
        {clientSecret && (
          <Elements options={options} stripe={promise}>
            <CheckOutForm confirmOrder={props.confirmOrder} />
          </Elements>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  #root {
    display: flex;
    align-items: center;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100vh;
    width: 100vw;
  }

  .close {
    display: flex;
    justify-content: end;
    cursor: pointer;
  }

  form {
    display: flex !important;
    flex-direction: column !important;
    width: 30vw;
    min-width: 500px;
    align-self: center;
    display: flex;
    justify-content: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
    background: white;
  }

  h4 {
    text-align: center;
    font-size: 1rem;
  }
  #payment-message {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    padding-top: 12px;
    text-align: center;
  }

  #payment-element {
    margin-bottom: 24px;
  }

  /* Buttons and links */
  button {
    background: #57cc99;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  button:hover {
    filter: contrast(115%);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
      min-width: initial;
    }
  }
`;
export default StripeCheckout;
