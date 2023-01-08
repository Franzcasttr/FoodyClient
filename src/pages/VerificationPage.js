import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerificationPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  const verify = async () => {
    setLoading(true);
    try {
      const { data } = await API.post('/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      });
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      verify();
    }
  }, []);

  if (loading) {
    return (
      <LoadingWrapper>
        <h2>Loading...</h2>
      </LoadingWrapper>
    );
  }

  if (error) {
    return (
      <ErrorWrapper>
        <h4>There was an error, please check your verification link </h4>
      </ErrorWrapper>
    );
  }

  return (
    <Wrapper>
      <p>Email verified please login to continue</p>

      <Link to='/login' className='continue'>
        Login
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  p {
    font-size: 2rem;
  }
  .continue {
    width: 6rem;
    padding: 0.4rem;
    font-size: 1.4rem;
    color: white;
    text-align: center;
    border-radius: 10px;
    background: var(--clr-primary-1);
  }
`;
const LoadingWrapper = styled.div`
  display: grid;
  place-content: center;
`;
const ErrorWrapper = styled.div`
  display: grid;
  place-content: center;
`;

export default VerificationPage;
