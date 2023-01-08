import { Link } from 'react-router-dom';
import styled from 'styled-components';
import formatPrice from '../../utils/helper';

import { GoPlus } from 'react-icons/go';
import { useSelector } from 'react-redux';

const RelatedProducts = () => {
  const { products } = useSelector((state) => state.product);
  return (
    <Wrapper>
      <div className='container'>
        <div className='top'>
          <h5>More products</h5>
          <Link to='/products' className='link-btn'>
            See more
          </Link>
        </div>
        <div className='content-container'>
          <div className='mobile'>
            {products.slice(0, 4).map((item, index) => {
              const { _id: id, name, image, tag, price } = item;
              return (
                <div className='content' key={index}>
                  <article>
                    <Link to={`/products/${id}`} className='link'>
                      <img src={image} alt={name} />
                      <p className='name'>{name}</p>
                      <p className='tag'>{tag}</p>
                    </Link>
                    <div className='flex'>
                      <h4>{formatPrice(price)}</h4>
                      {/* <button className='btn'>
                        <GoPlus />
                      </button> */}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
          <div className='web'>
            {products.slice(0, 6).map((item, index) => {
              const { _id: id, name, image, tag, price } = item;
              return (
                <div className='content' key={index}>
                  <article>
                    <Link to={`/products/${id}`} className='link'>
                      <img src={image} alt={name} />

                      <p className='name'>{name}</p>
                      <p className='tag'>{tag}</p>
                      <div className='flex'>
                        <h4>{formatPrice(price)}</h4>
                        {/* <button className='btn-web'>Add to cart</button> */}
                      </div>
                    </Link>
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
    font-size: 1rem;
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
  .btn-web {
    display: none;
  }
  @media (min-width: 1024px) {
    .web {
      gap: 4rem !important;
    }
    .content {
      height: 370px !important;
      padding: 2rem !important;

      .name {
        font-size: 20px !important;
      }
      .tag {
        font-size: 15px !important;
      }
      .btn-web {
        margin-top: 2rem;
      }
    }

    img {
      width: 100px !important;
      height: 120px !important;
    }
  }

  @media (min-width: 768px) {
    .btn {
      display: none;
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
      height: 20rem;
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
    /* h4 {
      color: var(--clr-darkgrey);
    } */
    .flex {
      display: flex;
      flex-direction: column;
      align-items: center;

      .btn-web {
        width: 10rem !important;
        border-radius: 19px;
        display: block;
        height: 1% !important;
        padding: 0.5rem !important;
        width: 100%;
        border: none;
        color: #fff;
        background: var(--clr-primary-1);
        font-size: 20px;
        padding: 0.3rem;
        border-radius: 19px;
        text-align: center;
      }
    }
    .link-btn {
      color: var(--clr-primary-1);
      cursor: pointer;
    }
  }
`;

export default RelatedProducts;
