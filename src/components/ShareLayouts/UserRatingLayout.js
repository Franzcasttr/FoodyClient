import { Link, Navigate, NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../Logo';
import { BiArrowBack } from 'react-icons/bi';
import { SingleFooter } from '..';
import { Navbar } from '..';

const RatingLayout = () => {
  const handleclick = () => {
    return <Navigate to='/profile' />;
  };
  return (
    <Wrapper className='section-center'>
      <SharedRating className='section-center'>
        {/* <Logo /> */}

        <div className='back'>
          <Link to='/profile'>
            <BiArrowBack />
          </Link>
          <p>My Reviews</p>
        </div>
        <div className='navigation-bar'>
          <NavLink className='link' to='rate'>
            To Review
          </NavLink>
          <NavLink className='link' to='my-review'>
            My Reviews
          </NavLink>
        </div>
      </SharedRating>

      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const SharedRating = styled.section`
  position: sticky !important;
  top: 0;
  z-index: 999;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--background);

  .back {
    font-size: 1.5rem;
    display: inline-flex;
    gap: 1.5rem;
    p {
      font-size: 1.1rem;
    }
  }
  .navigation-bar {
    display: flex;
    gap: 2rem;

    .link {
      color: #000;
      font-size: 1rem;
    }
  }
  .active {
    border-bottom: 2px solid var(--clr-primary-1);
  }
  @media (min-width: 768px) {
    position: static !important;
    background-color: white;
    .navigation-bar {
      background-color: var(--background);
      padding: 1rem;
    }
    .back {
      display: none;
    }
  }
`;
export default RatingLayout;
