import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { RiProfileLine } from 'react-icons/ri';
import { GoPackage } from 'react-icons/go';
import { AiOutlineHeart } from 'react-icons/ai';
import { logoutuser } from '../../actions/auth';

const UserProfile = ({ user }) => {
  const [openUser, setOpenUser] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const getClickOutside = (e) => {
      if (openUser && e.target !== menuRef.current) {
        setOpenUser(false);
      }
    };
    window.addEventListener('click', getClickOutside);
    return () => {
      window.removeEventListener('click', getClickOutside);
    };
  }, [openUser]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutuser());
    navigate('/');
  };
  return (
    <>
      <Wrapper>
        <div className='user' onClick={() => setOpenUser(!openUser)}>
          <div className='profile-image'>
            <img src={user.profileimage} alt='user-profile' />
          </div>
          <span className='user-name'>{user.name}</span>
        </div>
        {openUser && (
          <>
            <div className='user-menu' ref={menuRef}>
              <div className='container'>
                <li>
                  <NavLink to='/my-account' className='profile-link'>
                    <RiProfileLine className='blue' />
                    <span>My Account</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/my-account/userorder' className='profile-link'>
                    <GoPackage className='green' />
                    <span>Orders</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/my-account/userfavorites'
                    className='profile-link'>
                    <AiOutlineHeart className='red' />
                    <span>Favorites</span>
                  </NavLink>
                </li>
                <li>
                  <button
                    className='profile-link logout'
                    onClick={handleLogout}>
                    <RiLogoutBoxLine className='yellow' />
                    <span>Logout</span>
                  </button>
                </li>
              </div>
            </div>
          </>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .user-menu {
    position: absolute;
    bottom: -100px;
    right: 0;
    /* border: 1px solid var(--clr-primary-2); */
    background: #fff;
    color: #000;
    border-radius: 10px;
    z-index: 1299;
    box-shadow: var(--lightblue-shadow);
    -moz-box-shadow: var(--lightblue-shadow);
    -webkit-box-shadow: var(--lightblue-shadow);
    padding: 2rem;
  }
  .user-menu::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: -10px;
    right: 6rem;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 10px solid var(--clr-primary-2);
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* .container li:not(:last-of-type) {
    border-bottom: 2px solid #000;
  } */
  li {
    cursor: pointer;
  }
  .profile-link {
    font-size: 1.2rem;
    display: flex;
    gap: 1rem;

    span {
      color: var(--clr-date);
    }
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
    color: var(--red-yellow);
    font-size: 1.4rem;
  }
  .logout {
    color: var(--clr-date);
    background: none;
    border: none;
    cursor: pointer;

    span {
      color: var(--green-dark);
    }
  }
`;
export default UserProfile;
