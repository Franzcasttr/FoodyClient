import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LOAD_PRODUCTS } from '../../action';

const HomeCart = ({ dispatch, products }) => {
  return (
    <Wrapper>
      <div className='addcart'>
        <Link
          to='/cart'
          className='cart-btn'
          onClick={() => dispatch({ type: LOAD_PRODUCTS, payload: products })}>
          Add to cart
        </Link>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: sticky;
  bottom: 0;
  .addcart {
    padding: 1rem;
    background: #ebeff2;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .cart-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    width: 100%;
    border: none;
    color: #fff;
    border-radius: 19px;
    background: #57cc99;
    font-size: 18px;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
const mapDispatchToProp = (state) => {
  const { cart } = state.CartReducer;
  return { cart };
};
export default connect(mapDispatchToProp)(HomeCart);

// const [width, setWidth] = useState([window.innerWidth]);

// useEffect(() => {
//   const handleSize = () => {
//     setWidth([window.innerWidth]);
//   };
//   window.addEventListener('resize', handleSize);
// }, []);

// className={`${width > 767 ? 'section-center' : null}`}

//  style

/* position: relative;
    .addcart {
      display: flex;
      background: none;
      padding: 0;
      box-shadow: none;
      justify-content: right !important;
      margin: 2rem 0;
    }
    .cart-btn {
      padding: 1.5rem;
      width: 15rem;

      border-radius: 25px;
      background: #57cc99;
      font-size: 18px;
    } */
