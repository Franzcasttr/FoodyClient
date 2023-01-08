import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { createpayment, createuserorder, getaddress } from '../actions/user';
import { Navbar, Payment, ShippingDetails, SingleFooter } from '../components';
import Address from '../components/Checkout/Address';
import AddressModal from '../components/Checkout/AddressModal';

import StripeCheckout from '../components/Checkout/StripeCheckout';
import Loading from '../utils/Loading';
import { BiArrowBack } from 'react-icons/bi';
import { GrNext } from 'react-icons/gr';

const CheckoutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const { address, loading } = useSelector((state) => state.user);
  const { shippingfee } = useSelector((state) => state.cart);
  const [singleAddress, setSingleAdress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectAdress, setSelectAdress] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState([]);
  const [selectPayment, setSelectPayment] = useState('card');

  const [openStripe, setOpenStripe] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const [cart, setCart] = useState(cartItems);

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getaddress());
  }, [dispatch]);

  const selectAddress = (addr) => {
    const updateAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );

    setSingleAdress(updateAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setConfirmAddress(true);
    setSelectAdress(addr);
  };

  const editUserAddress = (addr) => {
    setModalOpen(true);
    setEditAddress(addr);
  };

  const confirmOrder = () => {
    const totalPrice = Object.keys(cart).reduce((totalPrice, key) => {
      const { price, amount } = cart[key];
      return totalPrice + amount * price;
    }, 0);

    const items = Object.keys(cart).map((key) => ({
      productId: key,
      payablePrice: cart[key].price,
      purchasedQty: cart[key].amount,
    }));
    const payload = {
      addressId: selectAdress._id,
      totalAmount: totalPrice + shippingfee,
      items,
      paymentStatus: 'pending',
      paymentType: selectPayment,
    };
    dispatch(createuserorder(payload));
    navigate('/success');
  };

  const cardConfirmOrder = () => {
    const totalPrice = Object.keys(cart).reduce((totalPrice, key) => {
      const { price, amount } = cart[key];
      return totalPrice + amount * price;
    }, 0);

    const items = Object.keys(cart).map((key) => ({
      productId: key,
      payablePrice: cart[key].price,
      purchasedQty: cart[key].amount,
    }));
    const payload = {
      addressId: selectAdress._id,
      totalAmount: totalPrice + shippingfee,
      items,
      paymentStatus: 'completed',
      paymentType: selectPayment,
    };
    dispatch(createpayment(payload));
  };

  useEffect(() => {
    const selectedAddress = address.map((addr) => ({
      ...addr,
      selected: false,
      edit: false,
    }));

    setSingleAdress(selectedAddress);
  }, [address]);

  const [toggleClick, setToggleClick] = useState(false);

  if (loading) {
    return (
      <div className='section-center'>
        <Loading />
      </div>
    );
  }
  return (
    <>
      <Nav>
        <Navbar />
      </Nav>
      <SharedRating>
        <div className='back'>
          <Link to='/cart'>
            <BiArrowBack />
          </Link>
          <p>Checkout</p>
        </div>
      </SharedRating>
      <Wrapper className='section-center'>
        <div className='container'>
          <div className='title'>
            <h3>Checkout</h3>
          </div>

          <div className='shipping-details'>
            <div className='credentials'>
              <div className='user-shipping'>
                {address ? (
                  <h3>Please select address</h3>
                ) : (
                  <h3 className='shipping-header'>Shipping Details</h3>
                )}

                {confirmAddress ? (
                  <div className='address-selected'>
                    <div className='main'>
                      <span>{selectAdress.addresstype}</span>
                      <div className='header'>
                        <p>{selectAdress.name}</p>
                        <p>{selectAdress.mobilenumber}</p>
                      </div>
                      <div className='body'>
                        <p>{selectAdress.street},</p>
                        <p>{selectAdress.barangay},</p>
                        <p>{selectAdress.city},</p>
                        <p>{selectAdress.province}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  singleAddress.map((adr, index) =>
                    address ? (
                      <Address
                        key={index}
                        adr={adr}
                        selectAddress={selectAddress}
                        confirmDeliveryAddress={confirmDeliveryAddress}
                        editUserAddress={editUserAddress}
                      />
                    ) : (
                      <ShippingDetails />
                    )
                  )
                )}
                {confirmAddress ? null : (
                  <div className='add-new'>
                    <h5 onClick={() => setToggleClick(!toggleClick)}>
                      Add new address
                    </h5>
                  </div>
                )}
                {toggleClick && (
                  <ShippingDetails setToggleClick={setToggleClick} />
                )}
              </div>

              <Payment
                confirmAddress={confirmAddress}
                confirmOrder={confirmOrder}
                setSelectPayment={setSelectPayment}
                selectPayment={selectPayment}
                setOpenStripe={setOpenStripe}
                cardConfirmOrder={cardConfirmOrder}
              />
              {/* {address && (
                <Link to='/success' className='checkout-btn'>
                  Place Order
                </Link>
              )} */}
            </div>
          </div>
        </div>
        <div>
          <StripeModalWrapper className='section-center'>
            <AnimatePresence>
              {openStripe && (
                <>
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        delay: 0.3,
                      },
                    }}
                    className='modal-backdrop'
                    onClick={() => setOpenStripe(false)}
                  />

                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                      transition: {
                        duration: 0.3,
                      },
                    }}
                    exit={{
                      scale: 0,
                      transition: {
                        delay: 0.3,
                      },
                    }}
                    className='modal-wrapper'>
                    <motion.div
                      initial={{
                        x: 100,
                        opacity: 0,
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        transition: {
                          delay: 0.3,
                          duration: 0.3,
                        },
                      }}
                      exit={{
                        x: 100,
                        opacity: 0,
                        transition: {
                          duration: 0.3,
                        },
                      }}
                      className='modal-content'>
                      {/* <CheckOutForm /> */}
                      <StripeCheckout
                        // totalPrice={totalPrice}
                        setOpenStripe={setOpenStripe}
                        // cardConfirmOrder={cardConfirmOrder}
                      />
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </StripeModalWrapper>
        </div>
      </Wrapper>

      <AddressModalWrapper className='section-center'>
        <AnimatePresence>
          {modalOpen && (
            <>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    delay: 0.3,
                  },
                }}
                className='modal-backdrop'
                onClick={() => setModalOpen(false)}
              />
              <motion.div
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                  transition: {
                    duration: 0.3,
                  },
                }}
                exit={{
                  scale: 0,
                  transition: {
                    delay: 0.3,
                  },
                }}
                className='modal-wrapper'>
                <motion.div
                  initial={{
                    x: 100,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.3,
                    },
                  }}
                  exit={{
                    x: 100,
                    opacity: 0,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                  className='modal-content'>
                  <AddressModal
                    editAddress={editAddress}
                    setModalOpen={setModalOpen}
                  />
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </AddressModalWrapper>
      <FooterNav className='section-center'>
        <div className='container'>
          <div className='links'>
            <Link to='/' className='active-link'>
              Home
            </Link>
            <GrNext />
            <Link to='/cart' className='active-link'>
              Cart
            </Link>
            <GrNext />
            <div>Checkout</div>
          </div>
        </div>
      </FooterNav>
      <SingleFooter />
    </>
  );
};

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

const Wrapper = styled.section`
  margin-top: 7rem;
  .title {
    h3 {
      display: grid;
      place-items: center;
      color: var(--clr-primary-1);
      margin: 2rem;
    }
  }
  .add-new {
    margin-top: 1rem;
    padding: 0.5rem;
    box-shadow: var(--shadow);
    text-align: center;
    color: var(--clr-date);
  }
  h5 {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .address-selected {
    margin-top: 2rem;

    display: grid;
    grid-template-rows: 1fr;
    /* text-align: center; */
    box-shadow: var(--shadow);
    padding: 1rem;
  }

  .main {
    display: flex;
    flex-direction: column;

    span {
      margin-bottom: 1rem;
      text-transform: capitalize;
      font-weight: 700;
      color: var(--clr-primary-1);
    }

    .header {
      display: flex;
      flex-direction: row;
      gap: 2rem;
    }

    .body {
      display: flex;
      flex-direction: row;
      gap: 0.3rem;
    }
  }
  @media (min-width: 768px) {
    margin-top: 0;
    .credentials {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
    }
  }
  @media (min-width: 1024px) {
    .credentials {
      display: grid;
      grid-template-columns: 2fr 1fr;
    }
  }
`;

const StripeModalWrapper = styled.section`
  .modal-backdrop {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .modal-wrapper {
    position: fixed;
    max-width: 1174px;
    width: 90%;
    height: 74%;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    border-radius: 1rem;
    overflow-x: scroll;
    /* background: var(--background); */
  }

  .close {
    display: flex;
    justify-content: end;
    cursor: pointer;
  }

  .close-modal {
    color: red;
    position: fixed;
    margin-bottom: 2rem;
    font-size: 1.8rem;
    padding: 0.5rem;
    box-shadow: var(--light-shadow);
    background: var(--background);
    border-radius: 2rem;
  }
  /* .modal-content {
    overflow-x: scroll;
  } */

  form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.2rem 2rem;

    input[type='text'] {
      height: 40px;
      outline: none;
      border: 1px solid var(--clr-primary-1);
      border-radius: 2rem;
      padding: 1rem;
      font-size: 14px;
      background: var(--background);
      margin-bottom: 1.5rem;
      margin-top: 0.4rem;
    }
    input[type='number'] {
      height: 40px;
      outline: none;
      border: 1px solid var(--clr-primary-1);
      border-radius: 2rem;
      padding: 1rem;
      font-size: 14px;
      background: var(--background);
      margin-bottom: 1.5rem;
      margin-top: 0.4rem;
    }

    p {
      font-size: 1rem;
    }
    .form-flex {
      display: flex;
      flex-direction: row;
      gap: 4rem;
      margin-bottom: 2rem;
      font-size: 1rem;

      .home-address {
        padding: 1rem;
        box-shadow: var(--shadow);
        background: var(--clr-secondary-3);
        color: white;
        border-radius: 1rem;
        cursor: pointer;
      }
      .work-address {
        padding: 1rem;
        box-shadow: var(--shadow);
        background: var(--clr-primary-2);
        color: white;
        border-radius: 1rem;
        cursor: pointer;
      }

      label {
        margin-left: 1rem;
        cursor: pointer;
      }
    }
  }
  .btn-save {
    padding: 1rem;
    color: white;
    background: var(--clr-primary-1);
    border: none;
    outline: none;
    font-size: 1rem;
    border-radius: 1rem;
    width: 6rem;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    input[type='text'] {
      background: #fff !important;
      height: 40px !important;
      font-size: 18px !important;
      border-radius: 0 !important;
    }
    input[type='number'] {
      background: #fff !important;
      height: 40px !important;
      font-size: 18px !important;
      border-radius: 0 !important;
    }
    .home-address {
      padding: 0.7rem !important;
    }
    .work-address {
      padding: 0.7rem !important;
    }

    .modal-wrapper {
      height: 90%;
      width: 70%;
      padding: 2rem;
      background: white;
      padding: 2rem;
      overflow: hidden;
    }

    .close-modal {
      font-size: 2rem;
      background: white;
      position: relative;
    }
  }
`;

const AddressModalWrapper = styled.section`
  .modal-backdrop {
    z-index: 1011 !important;
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .modal-wrapper {
    z-index: 1012 !important;
    position: fixed;
    max-width: 1174px;
    width: 90%;
    height: 90%;
    margin: auto;
    top: 2rem;

    left: 0;
    right: 0;
    padding: 1rem;
    border-radius: 1rem;
    overflow-x: scroll;
    background: var(--background);
  }

  .close {
    display: flex;
    justify-content: end;
    cursor: pointer;
  }

  .close-modal {
    color: red;
    position: fixed;
    margin-bottom: 2rem;
    font-size: 1.8rem;
    padding: 0.5rem;
    box-shadow: var(--light-shadow);
    background: var(--background);
    border-radius: 2rem;
  }
  /* .modal-content {
    overflow-x: scroll;
  } */

  form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.2rem 2rem;

    input[type='text'] {
      height: 40px;
      outline: none;
      border: 1px solid var(--clr-primary-1);
      border-radius: 2rem;
      padding: 1rem;
      font-size: 14px;
      background: var(--background);
      margin-bottom: 1.5rem;
      margin-top: 0.4rem;
    }
    input[type='number'] {
      height: 40px;
      outline: none;
      border: 1px solid var(--clr-primary-1);
      border-radius: 2rem;
      padding: 1rem;
      font-size: 14px;
      background: var(--background);
      margin-bottom: 1.5rem;
      margin-top: 0.4rem;
    }

    p {
      font-size: 1rem;
    }
    .form-flex {
      display: flex;
      flex-direction: row;
      gap: 4rem;
      margin-bottom: 2rem;
      font-size: 1rem;

      .home-address {
        padding: 1rem;
        box-shadow: var(--shadow);
        background: var(--clr-secondary-3);
        color: white;
        border-radius: 1rem;
        cursor: pointer;
      }
      .work-address {
        padding: 1rem;
        box-shadow: var(--shadow);
        background: var(--clr-primary-2);
        color: white;
        border-radius: 1rem;
        cursor: pointer;
      }

      label {
        margin-left: 1rem;
        cursor: pointer;
      }
    }
  }
  .btn-save {
    padding: 1rem;
    color: white;
    background: var(--clr-primary-1);
    border: none;
    outline: none;
    font-size: 1rem;
    border-radius: 1rem;
    width: 6rem;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    input[type='text'] {
      background: #fff !important;
      height: 40px !important;
      font-size: 18px !important;
      border-radius: 0 !important;
    }
    input[type='number'] {
      background: #fff !important;
      height: 40px !important;
      font-size: 18px !important;
      border-radius: 0 !important;
    }
    .home-address {
      padding: 0.7rem !important;
    }
    .work-address {
      padding: 0.7rem !important;
    }

    .modal-wrapper {
      height: fit-content;
      background: white;
      padding: 2rem;
      top: 2rem !important;
    }

    .close-modal {
      font-size: 2rem;
      background: white;
      position: relative;
    }
  }
`;

const FooterNav = styled.div`
  .container {
    margin: 2rem 0;
    padding: 1rem;
    background-color: var(--background);
  }

  .links {
    display: flex;
    align-items: center;
    gap: 1rem;

    .active-link {
      color: var(--clr-primary-2);
    }
  }

  @media (min-width: 768px) {
    .container {
      background-color: var(--clr-light-grey2);
    }
    .links {
      gap: 2rem;
    }
  }
`;
export default CheckoutPage;
