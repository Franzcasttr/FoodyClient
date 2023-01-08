import { useEffect } from 'react';
import styled from 'styled-components';
import { SingleFooter } from '../components';
import Login from '../components/Register/Login';

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper className='section-center'>
      <Login />
      <SingleFooter />
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div``;
