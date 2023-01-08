import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from '..';
import { forgotpassword } from '../../actions/auth';
import FormRow from '../Form/FormRow';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email,
    };
    dispatch(forgotpassword(payload));
  };

  useEffect(() => {
    if (user) {
      if (location.state === null) {
        navigate('/');
      } else {
        navigate(location.state.from);
      }
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <Logo />
      <div className='container'>
        <div className='text-cta'>
          <p className='reset-head'>Reset your password</p>
          <p className='reset-body'>
            To reset your password, enter your email and submit. An email will
            be sent to you with instructions about how to complete the process.
          </p>
        </div>

        <div className='login-form'>
          <form className='form' onSubmit={handleSubmit}>
            <h3>Forgot Password</h3>

            <FormRow
              labelText='Email Address'
              type='email'
              name='email'
              value={email}
              handleChange={handleChange}
            />

            <div className='button'>
              <button
                type='button'
                className='btn-submit'
                onClick={handleSubmit}>
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .reset-head {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--clr-primary-dark-green);
  }
  .reset-body {
    margin: 2rem 0;
  }

  h3 {
    color: var(--clr-primary-1);
    text-align: center;
    margin-bottom: 2rem;
  }

  .form {
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: var(--light-shadow);
  }
  .picture {
    display: none;
  }

  .button {
    display: grid;
    place-content: center;
    margin-bottom: 1rem;

    button {
      padding: 1rem;
      background: var(--clr-primary-1);
      border: none;
      border-radius: 8px;
      width: 10rem;
      font-size: 1rem;
      color: #fff;
      cursor: pointer;
    }
  }

  @media (min-width: 992px) {
    .container {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 5rem;
    }
    .form {
      padding: 2rem;
      box-shadow: var(--lightblue-shadow);
    }

    .picture {
      display: block;
      .foody-pic-cta {
        width: 400px;
        height: 300px;
      }
    }
  }
`;
export default ForgotPassword;
