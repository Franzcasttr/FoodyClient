import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from '..';
import { signup } from '../../actions/auth';
import DeliverySVG from '../../assets/SVGS/LoginSVG';

import FormRow from '../Form/FormRow';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert, user, alertType, alertText } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;

    const currentUser = { name, email, password };

    dispatch(signup(currentUser));
    setValues({ name: '', email: '', password: '' });
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <Wrapper>
      <Logo />
      <div className='container'>
        <div className='text-cta'>
          <div className='picture'>
            <DeliverySVG className='foody-pic-cta' />
          </div>
          <div className='text'>
            <h1>
              Hungry? You're
              <br />
              in the right place
            </h1>
            <p>
              Signin to get started and order
              <br />
              your delicious food.
            </p>
          </div>
        </div>

        <div className='login-form'>
          <form className='form' onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            {showAlert && (
              <div className={`alert alert-${alertType}`}>{alertText}</div>
            )}

            <FormRow
              type='text'
              name='name'
              labelText='Full Name'
              value={values.name}
              handleChange={handleChange}
            />

            <FormRow
              type='email'
              name='email'
              value={values.email}
              handleChange={handleChange}
            />
            <FormRow
              type='password'
              name='password'
              value={values.password}
              handleChange={handleChange}
            />
            <div className='button'>
              <button type='submit' className='btn-submit'>
                Sign Up
              </button>
            </div>
            <p className='alternative'>
              Already have an account?{' '}
              <Link to='/login' className='signin-btn'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  h3 {
    color: var(--clr-primary-1);
    text-align: center;
    margin-bottom: 2rem;
  }
  .form {
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: var(--light-shadow);
    margin: 2rem 0;
  }
  .alert {
    padding: 0.375rem 0.75rem;
    margin: 1rem auto;
    border-color: transparent;
    text-align: center;
    text-transform: capitalize;
    font-size: 18px;
  }
  .alert-success {
    color: var(--green-dark);
    background: var(--green-light);
    border-radius: 15px;
  }
  .alert-danger {
    color: var(--red-dark);
    background: var(--red-light);
    border-radius: 15px;
  }
  h1 {
    font-size: 2rem;
    text-align: center;
  }
  p {
    text-align: center;
  }
  .picture {
    display: grid;
    place-content: center;
    .foody-pic-cta {
      width: 330px;
      height: 300px;
    }
  }
  .button {
    display: grid;
    place-content: center;
    margin-bottom: 1rem;

    button {
      padding: 1rem;
      background: var(--clr-primary-1);
      border: none;
      border-radius: 2rem;
      width: 10rem;
      font-size: 1rem;
      color: #fff;
      cursor: pointer;
    }
  }
  .alternative {
    text-align: center;
  }
  .signin-btn {
    color: var(--clr-primary-2);
    border: none;
    cursor: pointer;
    background: none;
    font-size: 1rem;
  }
  @media (min-width: 768px) {
    padding-top: 3rem;
    .container {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 1rem;
    }
    .form {
      padding: 2rem;
      box-shadow: var(--lightblue-shadow);
    }
    h1 {
      font-size: 2.5rem;
      text-align: left;
    }
    p {
      margin-top: 1rem;
      text-align: left;
    }
    .picture {
      display: flex;
      justify-content: left;

      .foody-pic-cta {
        width: 330px;
        height: 300px;
      }
    }
  }
  @media (min-width: 992px) {
    .container {
      grid-template-columns: 2fr 1fr;
      gap: 1rem;
    }

    h1 {
      font-size: 2.5rem;
    }
    p {
      margin-top: 1rem;
    }
    .text-cta {
      display: flex;
      flex-direction: column-reverse;
    }
    .picture {
      .foody-pic-cta {
        width: 400px;
        height: 300px;
      }
    }
  }
`;
export default Register;
