import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeuseraddress } from '../../actions/user';

const FetchAddress = ({ adr, editUserAddress }) => {
  const [confirmation, setConfirmation] = useState(false);
  const dispatch = useDispatch();
  const {
    _id,
    name,
    mobilenumber,
    city,
    street,
    barangay,
    province,
    addresstype,
  } = adr;

  const handleClick = () => {
    dispatch(removeuseraddress(_id));
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
                <p>Are you sure you want to Delete?</p>
                <div className='actions'>
                  <button
                    className='cancel'
                    onClick={() => setConfirmation(false)}>
                    Cancel
                  </button>
                  <button className='delete' onClick={handleClick}>
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className='action'>
        <span className='edit-link' onClick={() => editUserAddress(adr)}>
          Edit
        </span>
        <span className='delete-link' onClick={() => setConfirmation(true)}>
          Delete
        </span>
      </div>

      <div className='flex-container'>
        <div className='main'>
          <div className='type'>
            <p>{addresstype}</p>
          </div>
          <div className='header'>
            <p>{name}</p>
            <p>{mobilenumber}</p>
          </div>
          <div className='body'>
            <p>{street},</p>
            <p>{barangay},</p>
            <p>{city},</p>
            <p>{province}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;

  display: grid;
  grid-template-rows: 1fr;
  box-shadow: var(--shadow);
  padding: 1rem;

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
    width: 80vw;

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

  .type {
    text-transform: capitalize;
    font-weight: 700;
    color: var(--clr-primary-1);
  }

  .flex-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }
  .main {
    display: flex;
    flex-direction: column;

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
  .action {
    display: flex;
    justify-content: end;
    gap: 2rem;
  }
  .edit-link {
    cursor: pointer;
    color: var(--clr-primary-2);
    font-size: 1rem;
  }
  .delete-link {
    cursor: pointer;
    color: var(--clr-red);
    font-size: 1rem;
  }

  .confirm {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.6rem;
    background-color: var(--clr-primary-1);
    cursor: pointer;

    button {
      border: none;
      background: none;
      font-size: 1rem;
      color: white;
      cursor: pointer;
    }
  }
  @media (min-width: 768px) {
    .content {
      left: 35%;
      top: 30% !important;
      transform: translate(-50%, -50%);
      width: 35vw !important;
    }
  }
  @media (min-width: 1024px) {
    .content {
      width: 30vw !important;
    }
  }
`;

export default FetchAddress;
