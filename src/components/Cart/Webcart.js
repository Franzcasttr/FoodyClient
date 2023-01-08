import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addcart } from '../../actions/cart';

const Webcart = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { name, image, price, amount, _id: id } = products;

  // const items = {
  //   name,
  //   image,
  //   price,
  //   amount,
  //   id,
  // };

  const handleAdd = () => {
    user
      ? dispatch(addcart({ id, name, image, price, amount }))
      : navigate('/login');
  };
  return (
    <Wrapper>
      <div className='addcart'>
        <Link to='/cart' className='cart-btn' onClick={handleAdd}>
          Add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1rem 0;

  .cart-btn {
    padding: 1rem;
    cursor: pointer;
    border: none;
    color: #fff;
    border-radius: 25px;
    background: var(--clr-primary-1);
    font-size: 18px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

export default Webcart;
