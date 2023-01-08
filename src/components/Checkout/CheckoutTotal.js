import { useSelector } from 'react-redux';
import formatPrice from '../../utils/helper';

const CheckoutTotal = (props) => {
  const { shippingfee } = useSelector((state) => state.cart);
  return (
    <div className='order-summary'>
      <h4>Order summary</h4>
      <div className='subtotal'>
        <p>Subtotal ({props.totalItems} items)</p>
        <p>{formatPrice(props.totalPrice)}</p>
      </div>
      <div className='subtotal'>
        <p>Shipping fee</p>
        <p>{formatPrice(shippingfee)}</p>
      </div>
      <div className='subtotal'>
        <h4 className='order-total'>Order Total</h4>
        <p className='total'>{formatPrice(props.totalPrice + shippingfee)}</p>
      </div>
    </div>
  );
};

export default CheckoutTotal;
