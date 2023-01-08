import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { createaddress } from '../../actions/user';
import FormRow from '../Form/FormRow';

const initialState = {
  name: '',
  mobilenumber: '',
  street: '',
  province: '',
  city: '',
  barangay: '',
  postalcode: '',
};

const ShippingDetails = ({ setToggleClick }) => {
  const [addresstype, setAddresstype] = useState('home');
  const [values, setValues] = useState(initialState);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, mobilenumber, street, province, city, barangay, postalcode } =
      values;

    const payload = {
      address: {
        name,
        mobilenumber,
        street,
        province,
        city,
        barangay,
        postalcode,
        addresstype,
      },
    };
    dispatch(createaddress(payload));
    setToggleClick(false);
  };
  return (
    <ShippingWrapper>
      <form onSubmit={handleSubmit}>
        <FormRow
          labelText='Full Name'
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
        />
        <FormRow
          labelText='Mobile Number'
          type='number'
          name='mobilenumber'
          value={values.mobilenumber}
          handleChange={handleChange}
        />

        <FormRow
          labelText='Street, Building, House Number, Block, etc...'
          type='text'
          name='street'
          value={values.street}
          handleChange={handleChange}
        />
        <FormRow
          type='text'
          name='province'
          value={values.province}
          handleChange={handleChange}
        />
        <FormRow
          labelText='City/Municipality'
          type='text'
          name='city'
          value={values.city}
          handleChange={handleChange}
        />
        <FormRow
          type='text'
          name='barangay'
          value={values.barangay}
          handleChange={handleChange}
        />
        <FormRow
          type='text'
          name='postalcode'
          value={values.postalcode}
          handleChange={handleChange}
        />
        <div>
          <p>Address type</p>
          <div className='form-flex'>
            <div className='home-address'>
              <input
                type='radio'
                name='addresstype'
                id='addresstype'
                onClick={(e) => setAddresstype(e.target.value)}
                value='home'
              />

              <label htmlFor='addresstype'>Home</label>
            </div>
            <div className='work-address'>
              <input
                type='radio'
                name='addresstype'
                id='addresswork'
                onClick={(e) => setAddresstype(e.target.value)}
                value='work'
              />

              <label htmlFor='addresswork'>Work</label>
            </div>
            {/* <div onClick={() => setAddresstype('home')}>Home</div> */}
          </div>
        </div>
      </form>
      <button onClick={handleSubmit} className='btn-save'>
        Save
      </button>
    </ShippingWrapper>
  );
};

const ShippingWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
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
  }
`;
export default ShippingDetails;
