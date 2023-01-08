import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import formatPrice from '../../utils/helper';

const CheckoutFooter = (props) => {
  const { shippingfee } = useSelector((state) => state.cart);
  return (
    <Wrapper>
      <div className='proceed'>
        <div className='total-amount'>
          <p>Total:</p>
          <p>{formatPrice(props.totalPrice + shippingfee)}</p>
        </div>

        <div className='proceed-btn'>
          <Link to='/success' className='btn-checkout'>
            Place Order
          </Link>
        </div>
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

    /* border-radius: 1rem 1rem 0 0; */
    padding: 0.5rem 2rem;
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
      padding: 0.6rem;
      border-radius: 2rem;
      background: var(--clr-primary-1);
      color: #fff;
      cursor: pointer;
    }
  }

  @media (min-width: 765px) {
    display: none;
  }
`;

export default CheckoutFooter;
