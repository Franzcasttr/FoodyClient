import React from 'react';
//home
import { AiOutlineHome } from 'react-icons/ai';

//product
import { BsListNested } from 'react-icons/bs';

import { IoBagOutline } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import formatPrice from '../../utils/helper';

//

const Cartfooter = (props) => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Wrapper>
      <div className='proceed'>
        <div className='total-amount'>
          <p>Subtotal:</p>
          <p>{formatPrice(props.totalPrice)}</p>
        </div>

        <div className='proceed-btn'>
          <Link to='/checkout' className='btn-checkout'>
            Checkout
          </Link>
        </div>
      </div>
      <div className='mobile'>
        <NavLink to='/' className='clr'>
          <AiOutlineHome />
          <span className='nav-name'>Home</span>
        </NavLink>

        <NavLink to='/products' className='clr'>
          <BsListNested className='explore' />
          <span className='nav-name'>Explore</span>
        </NavLink>
        <NavLink to='/cart' className='clr'>
          <span className='cart-container'>
            <IoBagOutline />
            <span className='cart-total'>{Object.keys(cartItems).length}</span>
          </span>
          <span className='nav-name'>Cart</span>
        </NavLink>
        <NavLink to='/favorites' className='clr'>
          <AiOutlineHeart />
          <span className='nav-name'>Favorite</span>
        </NavLink>
        <NavLink to='/profile' className='clr'>
          <VscAccount />
          <span className='nav-name'>Account</span>
        </NavLink>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  position: sticky;
  bottom: 0;

  .proceed {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 1rem 1rem 0 0;
    padding: 1rem 2rem;
    background: var(--background);
    box-shadow: var(--dark-shadow);

    .total-amount {
      display: flex;
      margin-top: 1rem;
      gap: 0.5rem;
      font-size: 1.1rem;
    }
    p:nth-child(2) {
      color: var(--clr-primary-1);
    }
  }

  .proceed-btn {
    display: flex;

    .btn-checkout {
      font-size: 1.1rem;
      padding: 0.5rem;
      /* border-radius: 1rem; */
      background: var(--clr-primary-1);
      color: #fff;
      cursor: pointer;
    }
  }
  .mobile {
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    box-shadow: var(--dark-shadow);
    padding: 0.3rem 2rem;
    background: var(--background);

    .active {
      color: var(--clr-primary-1) !important;
    }
    .active:nth-child(4) {
      color: var(--clr-red) !important;
    }
    .clr {
      color: var(--clr-primary-5);
      line-height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .nav-name {
      font-size: 10px;
    }
    /* .explore {
      font-size: 2rem;
    } */
    .cart-container {
      position: relative;

      .cart-total {
        position: absolute;
        top: -4px;
        right: -16px;
        background: var(--clr-primary-1);
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 1rem;
        color: white;
        padding: 12px;
      }
    }
  }
  @media (min-width: 765px) {
    display: none;
  }
`;

export default Cartfooter;
