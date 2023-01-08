import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import EditProfile from '../components/Profile/EditProfile';

import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { Navbar } from '../components';

const EditUserPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Nav>
        <Navbar />
        <div className='title section-center'>
          <h3>My Profile</h3>
        </div>
      </Nav>
      <Wrapper className='section-center'>
        <SharedRating>
          <div className='back'>
            <Link to='/profile' className='black'>
              <BiArrowBack />
            </Link>
            <p>My Profile</p>
          </div>
        </SharedRating>
        <EditProfile user={user} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section``;

const Nav = styled.div`
  .title {
    padding: 1rem;
    background-color: var(--clr-secondary-3);
    margin-bottom: 5rem;
    h3 {
      color: white;
    }
  }
  @media (max-width: 765px) {
    display: none;
    .title {
      display: none;
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
    display: none;
  }
`;
export default EditUserPage;
