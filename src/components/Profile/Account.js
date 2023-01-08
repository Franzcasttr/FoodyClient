import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import formatPrice from '../../utils/helper';
import { BsShop } from 'react-icons/bs';

const Account = ({ order }) => {
  if (order.length < 1) {
    return (
      <Wrapper>
        <div className='no-order'>
          <span>
            <BsShop />
          </span>
          <p>You have no recent order</p>
          <Link to='/products' className='shop-now-btn'>
            Shop now
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h4>Recent Order</h4>
      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Place On</th>
            <th>Items</th>
            <th>Total</th>
          </tr>
        </thead>

        {order.map((item, index) => {
          const { items, totalAmount } = item;

          return (
            <tbody key={index}>
              {items.map((item, index) => {
                const { _id, date, productId } = item;
                const { image, _id: id } = productId;

                return (
                  <tr key={index}>
                    <td>{_id}</td>
                    <td>{date}</td>
                    <td className='image-item'>
                      <Link to={`/products/${id}`}>
                        <img src={image} alt='item-image' />
                      </Link>
                    </td>
                    <td>{formatPrice(totalAmount)}</td>
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 2rem;
  overflow-x: auto;
  .no-order {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      font-size: 4rem;
      color: var(--background);
    }
    p {
      font-size: 1.2rem;
    }
  }
  .shop-now-btn {
    padding: 0.5rem;
    background-color: var(--clr-primary-1);
    color: white;
    border-radius: 10px;
    width: 6rem;
    text-align: center;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border-bottom: 1px solid #ddd;
    padding: 8px;
    padding-bottom: 2rem;
  }
  th {
    padding: 8px;
    text-align: left;
    background-color: var(--clr-primary-1);
    color: white;
  }
  .image-item {
    img {
      width: 40px;
      width: 40px;
    }
  }
  @media (max-width: 767px) {
    .no-order {
      span {
        color: var(--clr-light-grey3) !important;
      }
    }
  }
`;

export default Account;
