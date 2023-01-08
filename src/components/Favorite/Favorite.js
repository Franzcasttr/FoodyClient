import styled from 'styled-components';

import { AiFillHeart } from 'react-icons/ai';
import { BiSad } from 'react-icons/bi';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removefromfavorite } from '../../actions/user';

import formatPrice from '../../utils/helper';

import Loading from '../../utils/Loading';

const Favorite = () => {
  const { favorites, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(removefromfavorite(id));
  };

  if (loading) {
    return (
      <div className='section-center'>
        <Loading />
      </div>
    );
  }

  if (favorites.length < 1) {
    return (
      <FavoriteWrapper>
        <div className='no-favorites'>
          <span>
            <BiSad />
          </span>
          <p>Oh no you have no favorites</p>
          <Link to='/products' className='shop-now-btn'>
            Shop now
          </Link>
        </div>
      </FavoriteWrapper>
    );
  }
  return (
    <>
      <FavoriteWrapper className='section-center'>
        <div className='container'>
          <div className='content-container'>
            <div className='mobile'>
              {favorites.map((item, index) => {
                const { product } = item;
                const { _id: id, name, image, price, tag } = product;
                return (
                  <div className='content' key={index}>
                    <div className='heart' onClick={() => handleClick(id)}>
                      <AiFillHeart />
                    </div>
                    <article>
                      <Link to={`/products/${id}`} className='link'>
                        <img src={image} alt={name} />
                        <p className='name'>{name}</p>
                        <p className='tag'>{tag}</p>
                      </Link>

                      <h4>{formatPrice(price)}</h4>
                    </article>
                  </div>
                );
              })}
            </div>
            <div className='web'>
              {favorites.map((item, index) => {
                const { product } = item;
                const { _id: id, name, image, price, tag } = product;
                return (
                  <div className='content' key={index}>
                    <div className='heart' onClick={() => handleClick(id)}>
                      <AiFillHeart />
                    </div>
                    <article>
                      <Link to={`/products/${id}`} className='link'>
                        <img src={image} alt={name} />
                        <p className='name'>{name}</p>
                        <p className='tag'>{tag}</p>
                      </Link>

                      <h4 className='price'>{formatPrice(price)}</h4>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FavoriteWrapper>
    </>
  );
};

const FavoriteWrapper = styled.section`
  margin-bottom: 2rem;

  .no-favorites {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      font-size: 4rem;
      color: var(--clr-light-grey3);
    }

    p {
      font-size: 1.2rem;
    }

    .shop-now-btn {
      padding: 0.5rem;
      background-color: var(--clr-primary-1);
      color: white;
      border-radius: 10px;
      width: 6rem;
      text-align: center;
    }
  }

  .mobile {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    place-items: center;
  }
  .content {
    height: 100%;
    /* height: 235.51px; */
    padding: 1rem;
    box-shadow: var(--light-shadow);
    border-radius: 1rem;
    width: 100%;

    .heart {
      display: flex;
      justify-content: end;
      font-size: 1.4rem;
      color: var(--clr-red);
      cursor: pointer;
      box-sizing: var(--light-shadow);
    }

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
    font-size: 1rem;
  }

  .web {
    display: none;
  }

  @media (min-width: 768px) {
    .no-favorites {
      width: 45vw;
      span {
        color: var(--background) !important;
      }
    }
    .mobile {
      display: none;
    }
    .web {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      place-items: center;
    }
    .content {
      height: 100% !important;
      padding: 1rem;
      box-shadow: var(--light-shadow);
      border-radius: 1rem;
      width: 100%;

      .heart {
        font-size: 2rem;
      }

      .name {
        font-size: 18px;
      }
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
    .price {
      font-size: 1.3rem;
    }
  }

  @media (min-width: 1024px) {
    .web {
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 2rem !important;
    }

    .content {
      /* height: 300px !important; */
      padding: 1rem !important;
    }
    .btn-web {
      margin-top: 2rem;
    }
  }
`;
export default Favorite;
