import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { BiArrowBack } from 'react-icons/bi';
import { getaddress } from '../actions/user';
import { Navbar, ShippingDetails, SingleFooter } from '../components';
import FetchAddress from '../components/Checkout/FetchAddress';
import AddressModal from '../components/Checkout/AddressModal';
import { Link } from 'react-router-dom';
import Loading from '../utils/Loading';

const AddressPage = () => {
  const { address, loading } = useSelector((state) => state.user);
  const [toggleClick, setToggleClick] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState([]);

  const dispatch = useDispatch();

  //fetchaddress
  useEffect(() => {
    dispatch(getaddress());
  }, [dispatch]);

  const editUserAddress = (addr) => {
    setModalOpen(true);
    setEditAddress(addr);
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
      <SharedRating className='section-center'>
        <div className='back'>
          <Link to='/profile'>
            <BiArrowBack />
          </Link>
          <p>My Address</p>
        </div>
      </SharedRating>

      <AddressWrapper className='section-center'>
        <div className='header'>
          <Navbar />
        </div>

        <div>
          {address &&
            address.map((adr, index) =>
              address ? (
                <FetchAddress
                  key={index}
                  adr={adr}
                  editUserAddress={editUserAddress}
                />
              ) : (
                <ShippingDetails />
              )
            )}
        </div>
        {address.length > 0 ? (
          <>
            <div className='add-new'>
              <h5 onClick={() => setToggleClick(!toggleClick)}>
                Add new address
              </h5>
            </div>
            {toggleClick && <ShippingDetails />}
          </>
        ) : (
          <ShippingDetails />
        )}

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
        <div className='footer'>
          <SingleFooter />
        </div>
      </AddressWrapper>
    </>
  );
};

const SharedRating = styled.section`
  position: sticky !important;
  top: 0;
  z-index: 1;
  margin-bottom: 2rem;
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

const AddressWrapper = styled.section`
  .header {
    display: none;
  }
  .add-new {
    margin-top: 1rem;
    padding: 0.5rem;
    box-shadow: var(--shadow);
    text-align: center;
    color: var(--clr-date);
    cursor: pointer;
  }
  .footer {
    display: none;
  }

  @media (min-width: 768px) {
    .header {
      display: block;
    }
    .footer {
      display: block;
    }
  }
`;

const AddressModalWrapper = styled.section`
  .modal-backdrop {
    z-index: 9 !important;
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .modal-wrapper {
    z-index: 99 !important;
    position: fixed;
    max-width: 1174px;
    width: 90%;
    height: 90%;
    margin: auto;
    top: 0;
    bottom: 0;
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
      height: 70%;
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
export default AddressPage;
