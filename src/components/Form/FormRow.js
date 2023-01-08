import React from 'react';
import styled from 'styled-components';

const FormRow = ({ name, type, value, handleChange, labelText }) => {
  return (
    <Wrapper>
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className='form-input'
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form-row {
    display: grid;
    grid-template-columns: 1fr;
  }

  .form-label {
    font-size: 1rem;
    margin-bottom: 0.2rem;
    text-transform: capitalize;
  }

  input[type='text'],
  input[type='email'],
  input[type='password'] {
    height: 30px;
    outline: none;
    border: none;
    border-bottom: 2px solid var(--clr-light-grey);
    letter-spacing: 1.5px;
    font-size: 18px;
    background: var(--background);
    margin-bottom: 1.5rem;
  }
  @media (min-width: 768px) {
    input[type='text'],
    input[type='email'],
    input[type='password'] {
      background: #fff;
    }
  }
`;
export default FormRow;
