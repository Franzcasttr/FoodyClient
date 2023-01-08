import React from 'react';

import { IoBagOutline } from 'react-icons/io5';
// import { GoSettings } from 'react-icons/go';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from '..';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import UserProfile from './Profile';

const Navbar = () => {
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const handleSearchProducts = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products/search?searchQuery=${search}`);
    }
  };

  return (
    <Wrapper className='section-center section2'>
      <div className='container'>
        <div className='user-login'>
          <div className='navi'>
            <Link to='/' className='user-btn'>
              Home
            </Link>
            <Link to='/products' className='user-btn'>
              Products
            </Link>
          </div>
          <div className='navi-user'>
            {user ? (
              <>
                <UserProfile user={user} />
              </>
            ) : (
              <Link className='user-btn' to='/login'>
                Login
              </Link>
            )}
          </div>
        </div>
        <div className='nav-container'>
          <Logo className='logo' />

          <form className='input'>
            <input
              type='text'
              name='search'
              className='search'
              value={search}
              placeholder='Search Store'
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type='submit'
              onClick={handleSearchProducts}
              className='search-btn'>
              Search
            </button>
          </form>

          <Link to='/cart' className='btn'>
            <div className='cart-container'>
              <IoBagOutline className='btn-cart' />
              {user && (
                <span className='cart-total'>
                  {Object.keys(cartItems).length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  .user-login {
    display: none;
  }
  .nav-container {
    .input {
      display: flex;
      height: 45px;
      border-radius: 15px;
      box-shadow: var(--shadow);
      outline: none;
      color: var(--clr-primary-1);

      .search {
        border: none;
        border-radius: 15px;
        outline: none;
        font-size: 1rem;
        padding-left: 1rem;
        width: 100%;
      }
      .search-btn {
        display: none;
      }
    }
    .btn {
      display: none;
    }
  }
  @media (min-width: 768px) {
    .user-login {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .navi {
        display: flex;
        gap: 1rem;
      }
      .user-btn {
        color: var(--clr-primary-1);
        cursor: pointer;
      }
    }
    .user {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;

      .profile-image {
        /* padding: 1rem; */
        img {
          width: 45px;
          height: 45px;

          border-radius: 50%;
        }
      }
    }
    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
    }
    .input {
      height: 45px;
      width: 60%;
      border-radius: 0px !important;
    }
    .search-btn {
      width: 6rem;
      display: flex !important;
      align-items: center;
      justify-content: center;
      border: none;
      color: #fff;
      background: var(--clr-primary-2);

      font-size: 1rem;
      cursor: pointer;
    }
    .btn {
      display: flex !important;
    }

    .cart-container {
      position: relative;

      .cart-total {
        position: absolute;
        top: 1rem;
        right: -1px;
        background: var(--clr-primary-1);
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 1rem;
        color: white;
        padding: 10px;
      }
    }
    .btn-cart {
      width: 34px;
      height: 50px;
      color: var(--clr-primary-2);
    }
  }
`;

export default Navbar;
