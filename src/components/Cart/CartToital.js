import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import formatPrice from '../../utils/helper';

const CartToital = (props) => {
  const { shippingfee } = useSelector((state) => state.cart);

  return (
    <div className='total-amount'>
      <h4>Order Summary</h4>
      <div className='sub-total'>
        <p>Subtotal ({props.totalItems} items)</p>
        <p>{formatPrice(props.totalPrice)}</p>
      </div>
      <div className='sub-total'>
        <p>Shipping fee</p>
        <p>{formatPrice(shippingfee)}</p>
      </div>
      <hr
        style={{
          color: '#000',
          backgroundColor: '#000',
          height: 1,
        }}
      />
      <div className='sub-total'>
        <p>Order total</p>
        <p>{formatPrice(props.totalPrice + shippingfee)}</p>
      </div>
      <div className='proceed-btn'>
        <Link to='/checkout' className='btn-checkout'>
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartToital;
