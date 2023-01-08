import { useEffect } from 'react';
import styled from 'styled-components';
import { Footer, Profile } from '../components';

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Wrapper className='section-center'>
        <Profile />
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.section``;
export default ProfilePage;
