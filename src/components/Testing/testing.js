import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchallproduct } from '../../actions/product';
import { Link } from 'react-router-dom';
import formatPrice from '../../utils/helper';
const Testing = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  console.log(products);

  const exclusive = products.filter((item) => item.exclusive === true);

  useEffect(() => {
    dispatch(fetchallproduct());
  }, [dispatch]);
  return (
    <div>
      {exclusive.map((item, index) => {
        const { id, name, image, tag, price } = item;
        return (
          <div className='content' key={index}>
            <article>
              <Link to={`products/${id}`} className='link'>
                <img src={image} alt={name} />

                <p className='name'>{name}</p>
                <p className='tag'>{tag}</p>
                <div className='flex'>
                  <h4>{formatPrice(price)}</h4>
                  <button className='btn-web'>Add to cart</button>
                </div>
              </Link>
            </article>
          </div>
        );
      })}
      <p>Hellow</p>
    </div>
  );
};
export default Testing;
