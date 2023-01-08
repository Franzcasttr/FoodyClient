import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from '..';
import { signin } from '../../actions/auth';
import DeliverySVG from '../../assets/SVGS/LoginSVG';
import Loading from '../../utils/Loading';

import FormRow from '../Form/FormRow';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const previous = location.state.from.pathname || '/';
  // console.log(location);

  const { showAlert, user, alertType, alertText, isLoading } = useSelector(
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
    const { email, password } = values;
    // if ((!email, !password)) {
    //   dispatch({ type: ALERT });
    // }
    const currentUser = { email, password };
    dispatch(signin(currentUser));
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

  if (isLoading) {
    return (
      <div className='section-center'>
        <Loading />
      </div>
    );
  }
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
            <h3>Login</h3>
            {showAlert && (
              <div className={`alert alert-${alertType}`}>{alertText}</div>
            )}

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
            <div className='forgotPassword'>
              <Link to='/forgotPassword' className='forgot'>
                Forgot Password?
              </Link>
            </div>
            <div className='button'>
              <button type='submit' className='btn-submit'>
                Login
              </button>
            </div>
            <p className='alternative'>
              Not a member yet?{' '}
              <Link to='/register' className='signin-btn'>
                Register
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

  .forgotPassword {
    text-align: center;
    margin: 1rem 0;

    .forgot {
      font-size: 1rem;
      color: var(--clr-primary-2);
      cursor: pointer;
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
export default Login;
