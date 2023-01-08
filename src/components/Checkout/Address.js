import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Address = ({
  adr,
  selectAddress,
  confirmDeliveryAddress,
  editUserAddress,
}) => {
  const {
    _id,
    name,
    mobilenumber,
    city,
    street,
    barangay,
    province,

    selected,
  } = adr;

  // const [selectAdress, setSelectAdress] = useState([]);

  return (
    <Wrapper>
      {selected && (
        <span className='edit-link' onClick={() => editUserAddress(adr)}>
          Edit
        </span>
      )}
      {/* <h4 className='type'>{addresstype}</h4> */}
      <div className='flex-container'>
        <input
          type='radio'
          name='add'
          // value={addresses}
          onClick={() => selectAddress(adr)}
        />
        <div className='main'>
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
      {selected && (
        <div className='confirm'>
          <button onClick={() => confirmDeliveryAddress(adr)}>
            Confirm Delivery Address
          </button>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;

  display: grid;
  grid-template-rows: 1fr;
  box-shadow: var(--shadow);
  padding: 1rem;

  .type {
    padding: 1rem;
    text-transform: capitalize;
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
  .edit-link {
    cursor: pointer;
    color: var(--clr-primary-2);
    font-size: 1rem;
    display: flex;
    justify-content: end;
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
`;

export default Address;
