import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import styled from 'styled-components';
import { API } from '../api';
import FormRow from '../components/Form/FormRow';
import { Logo } from '../components';
import Loading from '../utils/Loading';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showHide, setShowHide] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const query = useQuery();

  const verify = async () => {
    setLoading(true);
    console.log('running query');
    try {
      const res = await API.post('/auth/resetPassword', {
        token: query.get('token'),
        email: query.get('email'),
        password,
      });
      const { msg } = res.data;
      if (res.status === 200) {
        setAlertText(msg);
        setLoading(false);
      }
      console.log('query successful');
    } catch (error) {
      setErrorAlert(error.response.data.msg);
      setError(true);
      setLoading(false);
      console.log('query failed');
    }
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    verify();
  };

  if (loading) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  if (error) {
    return (
      <>
        <ErrorWrapper className='section-center'>
          <Logo />
          <h4> {errorAlert}</h4>
        </ErrorWrapper>
      </>
    );
  }

  if (alertText) {
    return (
      <Wrapper className='section-center alert-success'>
        <Logo />
        <h4 className='alert'>{alertText} redirecting to login page...</h4>
      </Wrapper>
    );
  }

  return (
    <Wrapper className='section-center'>
      <Logo />
      <form className='form' onSubmit={handleSubmit}>
        <h3>Enter new password</h3>

        <div className='showpass'>
          <FormRow
            labelText='new password'
            type={showHide ? 'text' : 'password'}
            name='newpwd'
            value={password}
            handleChange={handleChange}
          />
          <div className='show-hide' onClick={() => setShowHide(!showHide)}>
            {showHide ? <BsEye /> : <BsEyeSlash />}
          </div>
        </div>

        <div className='button'>
          <button type='button' className='btn-submit' onClick={handleSubmit}>
            Confirm
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 1rem;

  .alert-success {
    margin-top: 2rem;
    .alert {
      display: grid;
      place-content: center;
      margin-top: 10rem;
      font-size: 1rem;
    }
  }
  h3 {
    color: var(--clr-primary-1);
    text-align: center;
    margin-bottom: 2rem;
  }

  .showpass {
    display: inline-flex;
    align-items: center;

    .show-hide {
      font-size: 1.3rem;
      cursor: pointer;
      color: var(--clr-light-grey);
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: var(--light-shadow);
    width: fit-content;
    text-align: center;
    margin: auto;
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
`;
const LoadingWrapper = styled.div`
  margin-top: 2rem;
  display: grid;
  place-content: center;
`;
const ErrorWrapper = styled.div`
  margin-top: 2rem;
  h4 {
    display: grid;
    place-content: center;
    margin-top: 10rem;
    font-size: 1rem;
  }
`;

export default ResetPasswordPage;
