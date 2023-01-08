import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Footer, Navbar, Profile } from '../components';

const WebProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Nav>
        <div className='nav'>
          <Navbar />
        </div>
      </Nav>
      <Wrapper className='section-center'>
        {/* <div className='profile'>
          <Profile />
        </div> */}
        <NavLink to='userrate'>rate</NavLink>
        <div className='webprofile'>
          <Outlet />
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

const Nav = styled.div`
  .nav {
    display: none;
  }
  @media (min-width: 768px) {
    .nav {
      display: block;
    }
  }
`;

const Wrapper = styled.section`
  .webprofile {
    display: none;
  }
  @media (min-width: 768px) {
    .profile {
      display: none;
    }
    .webprofile {
      display: block !important;
    }
  }
`;
export default WebProfile;
