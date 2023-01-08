import styled from 'styled-components';
import formatPrice from '../../utils/helper';

import Footer from '../Footer/footer';
import Navbar from '../Navbar/Navbar';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewAllProducts = () => {
  const { products } = useSelector((state) => state.product);

  return (
    <>
      <Navbar />
      <Wrapper className='section-center'>
        <div className='container'>
          <div className='top'>
            <h5>More products</h5>
          </div>
          <div className='content-container'>
            <div className='mobile'>
              {products.map((item, index) => {
                const { _id, name, image, tag, price } = item;

                return (
                  <div className='content' key={index}>
                    <article>
                      <Link to={`/products/${_id}`} className='link'>
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
      <Footer />
    </>
  );
};
const Wrapper = styled.section`
  .container {
    margin: 2rem 0;
  }
  .btn-web {
    display: none;
  }
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
    width: 70.89px;
    height: 75.43px;
    text-align: center;
  }
  h4 {
    color: var(--clr-darkgrey);
  }

  .top {
    display: flex;
    justify-content: space-between;

    .link-btn {
      color: var(--clr-primary-1);
      cursor: pointer;
    }
  }

  @media (min-width: 768px) {
    .container {
      margin: 3rem 0 !important;
    }
    .btn-web {
      display: block;
    }
    .btn {
      display: none;
    }
    h5 {
      font-size: 25px !important;
    }
    .mobile {
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 2rem;
    }
    .content {
      height: 300px !important;
      padding: 0.3rem !important;

      .name {
        font-size: 20px !important;
      }
      .tag {
        font-size: 15px !important;
      }
    }

    img {
      width: 100.89px;
      height: 100.43px;
      text-align: center;
    }
    h4 {
      color: var(--clr-darkgrey);
      font-size: 25px !important;
    }
    .flex {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .top {
      display: flex;
      justify-content: space-between;

      .link-btn {
        color: var(--clr-primary-1);
        cursor: pointer;
      }
    }
  }
`;

export default ViewAllProducts;
