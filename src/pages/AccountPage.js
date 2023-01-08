import { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getuserorder } from '../actions/user';
import Account from '../components/Profile/Account';
import Loading from '../utils/Loading';

const AccountPage = () => {
  const { order, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuserorder());
  }, [dispatch]);

  if (loading) {
    return (
      <div className='section-center'>
        <Loading />
      </div>
    );
  }

  return (
    <Wrapper className='section-center'>
      <div className='title'>
        <h3>My Account</h3>
      </div>
      <SharedRating>
        <div className='back'>
          <Link to='/profile' className='black'>
            <BiArrowBack />
          </Link>
          <p>My Account</p>
        </div>
      </SharedRating>

      <div className='content'>
        <Account order={order} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .title {
    display: none;
  }

  @media (min-width: 768px) {
    .title {
      display: block;
    }
  }
`;

const SharedRating = styled.div`
  position: sticky !important;
  top: 0;
  z-index: 999;
  margin-bottom: 2rem;
  padding: 1rem;
  border-bottom: 1px solid var(--clr-light-grey);
  background-color: var(--background);

  .back {
    font-size: 1.5rem;
    display: inline-flex;
    gap: 1.5rem;
    .black {
      color: #000;
    }
    p {
      font-size: 1.1rem;
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
export default AccountPage;
