import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//icons
import { AiOutlineHeart } from 'react-icons/ai';
import { GoPackage } from 'react-icons/go';
import { RiProfileLine } from 'react-icons/ri';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { IoLocationOutline } from 'react-icons/io5';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { FcAbout } from 'react-icons/fc';
import { CgFileDocument } from 'react-icons/cg';
import { MdOutlineStars } from 'react-icons/md';

import { Hr } from '..';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutuser } from '../../actions/auth';
import ProfileHeader from './ProfileHeader';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutuser());
    navigate('/');
  };
  return (
    <Wrapper>
      <div className='header'>
        {user ? (
          <ProfileHeader />
        ) : (
          <>
            <p className='greeting'>Hello, Welcome to Foody</p>
            <Link className='primary' to='/login'>
              Login/Signup
            </Link>
          </>
        )}
      </div>
      <Hr />
      <div className='body'>
        <NavLink to='/favorites' className='profile-link'>
          <AiOutlineHeart className='red' />
          <span>Favorites</span>
        </NavLink>
        <Hr />
        <NavLink to='/order' className='profile-link'>
          <GoPackage className='green' />
          <span>Orders</span>
        </NavLink>
        <Hr />
        <NavLink to='/my-ratings' className='profile-link'>
          <MdOutlineStars className='yellow' />
          <span>My Rating</span>
        </NavLink>
        <Hr />
        <NavLink to='/edit-profile' className='profile-link'>
          <RiProfileLine className='blue' />
          <span>My Account</span>
        </NavLink>
        <Hr />
        <NavLink to='/address' className='profile-link'>
          <IoLocationOutline className='yellow' />
          <span>Delivery Address</span>
        </NavLink>
        <Hr />
        <NavLink to='/help' className='profile-link'>
          <IoIosHelpCircleOutline className='yellow' />
          <span>Help</span>
        </NavLink>
        <Hr />
        <NavLink to='/policy' className='profile-link'>
          <CgFileDocument className='blue' />
          <span>Policy</span>
        </NavLink>
        <Hr />
        <NavLink to='/about' className='profile-link'>
          <FcAbout />
          <span>About</span>
        </NavLink>
        <Hr />
        {user && (
          <>
            <button className='profile-link logout' onClick={handleLogout}>
              <RiLogoutBoxLine />
              <span>Logout</span>
            </button>
          </>
        )}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .header {
    padding: 3rem 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .greeting {
      color: black;
    }
    .primary {
      padding: 0.7rem;
      background: var(--clr-primary-1);
      color: white;
      border-radius: 1rem;
      font-size: 1rem;
      cursor: pointer;
    }
    p {
      font-size: 1.3rem;
      color: var(--clr-primary-2);
    }
    h4 {
      font-size: 1.7rem;
    }
    a {
      font-size: 1.2rem;
    }
    .edit {
      width: 50%;
      margin-top: 0.4rem;
      padding: 1rem;
      color: white;
      background: var(--clr-primary-1);
      border-radius: 1rem;
      cursor: pointer;
    }
  }
  .profile-link {
    font-size: 1.2rem;
    display: flex;
    gap: 1rem;
    padding: 2rem 0;
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

    span {
      color: var(--green-dark);
    }
  }
`;
export default Profile;
