import styled from 'styled-components';
import formatPrice from '../../utils/helper';
import { GoSettings } from 'react-icons/go';

import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductBySearch } from '../../actions/product';
import { Hr } from '..';
import FilterProduct from './FilterProduct';
import { useState } from 'react';
import FilterProductMobile from './FilterProductMobile';

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

const SearchProducts = () => {
  const { products, error, errorText, totalProduct } = useSelector(
    (state) => state.product
  );

  const [toggleFilter, setToggleFilter] = useState(false);
  const [select, setSelect] = useState('price-lowest');

  const navigate = useNavigate();

  const query = useQuery();
  const dispatch = useDispatch();

  const search = query.get('searchQuery');
  const sort = query.get('sort');

  useEffect(() => {
    dispatch(fetchProductBySearch({ search, sort }));
    navigate(`/products/search?searchQuery=${search}&sort=${select}`);
  }, [dispatch, select, search]);

  if (error) {
    return (
      <>
        <ErrorWrapper>
          <div className='empty'>
            <h1>We're Sorry!</h1>
            <p>{errorText}</p>
            <Link to='/' className='go-back'>
              Go Back
            </Link>
          </div>
        </ErrorWrapper>
      </>
    );
  }
  return (
    <>
      {toggleFilter && (
        <FilterProductMobile setToggleFilter={setToggleFilter} />
      )}
      <Wrapper className='section-center'>
        <FilterProduct />
        <div className='container'>
          <div className='top'>
            <div className='first'>
              <div className='mobile-filter'>
                <button
                  className='filter'
                  onClick={() => setToggleFilter(true)}>
                  <GoSettings />
                </button>
              </div>
              <p>
                {totalProduct} {totalProduct > 1 ? 'Products' : 'Product'} Found
              </p>
            </div>
            <Hr />
            {totalProduct > 1 && (
              <form>
                <label htmlFor='sort'>Sort By:</label>
                <select
                  name='sort'
                  id='sort'
                  value={select}
                  onChange={(e) => setSelect(e.target.value)}
                  className='sort-input'>
                  <option value='price-lowest'>Price (Lowest)</option>
                  <option value='price-highest'>Price (Highest)</option>
                </select>
              </form>
            )}
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
          {/* <div className='pages-btn'>
            <PagesBtn />
          </div> */}
        </div>
      </Wrapper>
    </>
  );
};

const ErrorWrapper = styled.section`
  .empty {
    display: grid;
    place-items: center;

    h1 {
      color: var(--clr-primary-1);
      margin: 2rem auto;
    }
    p {
      font-size: 1.2rem;
    }
    .go-back {
      color: #fff;
      font-size: 1.1rem;
      padding: 1rem;
      background: var(--clr-primary-2);
      border-radius: 1rem;
      cursor: pointer;
    }
  }
  @media (min-width: 768px) {
    h1 {
      font-size: 3rem !important;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const Wrapper = styled.section`
  margin-top: 2rem;
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
    margin-bottom: 2rem;
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
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1.4rem;

    .first {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .grid {
        cursor: pointer;
      }
    }

    label {
      margin-right: 1rem;
      font-size: 1rem;
    }

    .sort-input {
      border-color: transparent;
      font-size: 1rem;
      text-transform: capitalize;
      padding: 0.25rem 0.5rem;
    }

    p {
      font-size: 1.2rem;
    }
    .link-btn {
      color: var(--clr-primary-1);
      cursor: pointer;
    }
    .mobile-filter {
      display: flex;
      flex-direction: row;
      gap: 1rem;

      .filter {
        display: flex;
        justify-content: center;
        font-size: 24px;
        color: var(--clr-primary-1);
        border: none;
        background: none;
        outline: none;
        box-shadow: var(--light-shadow);
        margin-right: 0.5rem;
        padding: 0.3rem;
        border-radius: 0.5rem;
      }
      .grid {
        display: flex;
        justify-content: center;
        font-size: 24px;
        color: var(--clr-primary-1);
        border: none;
        background: none;
        outline: none;
        box-shadow: var(--light-shadow);
        margin-right: 0.5rem;
        padding: 0.3rem;
        border-radius: 0.5rem;
      }
    }
  }

  @media (min-width: 768px) {
    display: grid;
    /* justify-content: space-between; */
    place-content: center;
    grid-template-columns: 15rem 2fr;

    /* flox-direction: row; */

    gap: 3rem;

    .btn-web {
      display: block;
    }
    .btn {
      display: none;
    }
    h5 {
      font-size: 25px !important;
    }
    .mobile-filter {
      margin-bottom: 2rem;
      .filter {
        display: none !important;
      }
    }
    .mobile {
      grid-template-columns: repeat(2, 1fr) !important;
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

      .first {
        flex-direction: row;
      }

      p {
        font-size: 1.2rem;
      }
      .link-btn {
        color: var(--clr-primary-1);
        cursor: pointer;
      }
    }
  }
  @media (min-width: 1024px) {
    .mobile {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
`;

export default SearchProducts;
