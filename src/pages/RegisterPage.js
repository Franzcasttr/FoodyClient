import { useEffect } from 'react';
import styled from 'styled-components';
import { Register, SingleFooter } from '../components';

const RegisterPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper className='section-center'>
      <Register />
      <SingleFooter />
    </Wrapper>
  );
};

export default RegisterPage;

const Wrapper = styled.div``;
