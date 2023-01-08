import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Footer, Navbar } from '../components';
import { AiOutlineHeart } from 'react-icons/ai';
import { GoPackage } from 'react-icons/go';
import { RiProfileLine } from 'react-icons/ri';

import { IoLocationOutline } from 'react-icons/io5';

import { MdOutlineStars } from 'react-icons/md';

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
        <div className='sidebar'>
          <NavLink to='account' className='profile-link'>
            <RiProfileLine className='blue' />
            <span>My Account</span>
          </NavLink>
          <NavLink to='userprofile' className='profile-link account'>
            <span>My Profile</span>
          </NavLink>
          <NavLink to='userfavorites' className='profile-link'>
            <AiOutlineHeart className='red' />
            <span>Favorites</span>
          </NavLink>
          <NavLink to='userorder' className='profile-link'>
            <GoPackage className='green' />
            <span>Orders</span>
          </NavLink>
          <NavLink to='userrate' className='profile-link'>
            <MdOutlineStars className='yellow' />
            <span>My Rating</span>
          </NavLink>

          <NavLink to='useraddress' className='profile-link'>
            <IoLocationOutline className='yellow' />
            <span>Delivery Address</span>
          </NavLink>
        </div>

        <Outlet />
      </Wrapper>
      <Nav>
        <div className='nav'>
          <Footer />
        </div>
      </Nav>
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
  .sidebar {
    display: none;
  }
  .webprofile {
    display: none;
  }
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    gap: 2rem;

    .active {
      font-weight: bold;
    }
    .sidebar {
      display: block;
      width: 50%;
      background-color: var(--sidebar);

      /* padding: 1rem; */

      .profile-link {
        font-size: 1rem;
        display: flex;
        gap: 1rem;
        margin: 1.6rem 1rem;
        span {
          color: var(--clr-date);
        }
      }
      .account {
        margin-top: -1rem;
        margin-left: 3.5rem;
      }

      .red {
        color: red;
        font-size: 1.4rem;
      }
      .green {
        color: var(--clr-primary-1);
        font-size: 1.4rem;
      }
      .blue {
        color: var(--clr-primary-2);
        font-size: 1.4rem;
      }
      .yellow {
        color: var(--red-light);
        font-size: 1.4rem;
      }
      .logout {
        width: 100%;
        margin: 2rem 0;
        align-items: center;
        padding: 2rem;
        border-radius: 1rem;
        background: var(--green-light);
        color: var(--green-dark);
        border: none;
      }
    }

    .webprofile {
      display: block !important;
    }
  }
`;
export default WebProfile;
