import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateaddress } from '../../actions/user';
import FormRow from '../Form/FormRow';
import { ImCross } from 'react-icons/im';

const AddressModal = (props) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState(props.editAddress);
  const [addresstype, setAddresstype] = useState(values.addresstype);

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setModalOpen(false);
    const {
      _id,
      name,
      mobilenumber,
      street,
      province,
      city,
      barangay,
      postalcode,
    } = values;

    const payload = {
      address: {
        _id,
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
    dispatch(updateaddress(payload));
  };

  return (
    <>
      <div className='close' onClick={() => props.setModalOpen(false)}>
        <ImCross className='close-modal' />
      </div>
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
                value='home'
                checked={addresstype === 'home'}
                onChange={(e) => setAddresstype(e.target.value)}
              />

              <label htmlFor='addresstype'>Home</label>
            </div>
            <div className='work-address'>
              <input
                type='radio'
                name='addresstype'
                id='addresswork'
                value='work'
                checked={addresstype === 'work'}
                onChange={(e) => setAddresstype(e.target.value)}
              />

              <label htmlFor='addresswork'>Work</label>
            </div>
          </div>
        </div>
      </form>
      <button onClick={handleSubmit} className='btn-save'>
        Update
      </button>
    </>
  );
};

export default AddressModal;
