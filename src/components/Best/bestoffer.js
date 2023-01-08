import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import formatPrice from '../../utils/helper';
import { useSelector } from 'react-redux';

const Bestoffer = () => {
  const { products } = useSelector((state) => state.product);

  const bestoffer_product = products.filter((item) => item.bestoffer === true);

  return (
    <Wrapper>
      <div className='container'>
        <div className='top'>
          <h5>best offer</h5>
        </div>
        <div className='content-container'>
          <div className='mobile'>
            {bestoffer_product.slice(0, 4).map((item, index) => {
              const { _id: id, name, image, tag, price } = item;
              return (
                <div className='content' key={index}>
                  <article>
                    <Link to={`products/${id}`} className='link'>
                      <img src={image} alt={name} />
                      <p className='name'>{name}</p>
                      <p className='tag'>{tag}</p>
                    </Link>
                    <div className='flex'>
                      <h4>{formatPrice(price)}</h4>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
          <div className='web'>
            {bestoffer_product.map((item, index) => {
              const { _id: id, name, image, tag, price } = item;
              return (
                <div className='content' key={index}>
                  <article>
                    <Link to={`products/${id}`} className='link'>
                      <img src={image} alt={name} />
                      <p className='name'>{name}</p>
                      <p className='tag'>{tag}</p>
                    </Link>
                    <div className='flex'>
                      <h4>{formatPrice(price)}</h4>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin: 2rem 0;
  h5 {
    font-size: 18px;
    font-weight: normal;
  }
  .mobile {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    place-items: center;
  }
  .content {
    height: 235.51px;
    padding: 1rem;
    box-shadow: var(--light-shadow);
    border-radius: 1rem;
    width: 100%;

    .name {
      font-size: 15px;
    }
    .tag {
      font-size: 13px;
      margin-top: -1rem;
    }
  }
  article {
    text-align: center;
  }
  .link {
    color: var(--clr-primary-5);
  }
  img {
    width: 99.89px;
    height: 79.43px;
    text-align: center;
  }
  h4 {
    color: var(--clr-price);
  }
  /* .flex {
    display: flex;
    justify-content: space-between;

    button {
      height: 30px;
      border: none;
      color: #fff;
      background: var(--clr-primary-1);
      font-size: 20px;
      padding: 0.3rem;
      border-radius: 7px;
      text-align: center;
    }
  } */
  .top {
    display: flex;
    justify-content: space-between;

    .link-btn {
      color: var(--clr-primary-1);
      cursor: pointer;
    }
  }

  .web {
    display: none;
  }

  @media (min-width: 768px) {
    .btn {
      display: none;
    }
    h5 {
      font-size: 25px;
    }
    .mobile {
      display: none;
    }
    .web {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      place-items: center;
    }
    .content {
      height: 320.51px;
      padding: 1rem;
      box-shadow: var(--light-shadow);
      border-radius: 1rem;
      width: 100%;

      .name {
        font-size: 18px;
      }
      .tag {
        font-size: 13px;
        margin-top: -1rem;
      }
    }
    article {
      text-align: center;
    }
    img {
      width: 80px;
      height: 100px;
      text-align: center;
    }

    .link-btn {
      color: var(--clr-primary-1);
      cursor: pointer;
      font-size: 25px;
    }
  }

  @media (min-width: 1024px) {
    .web {
      gap: 4rem !important;
    }

    .content {
      height: 350px !important;
      padding: 1rem !important;
    }
  }
`;

export default Bestoffer;
