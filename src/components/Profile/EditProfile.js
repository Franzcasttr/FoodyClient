import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import ChangePasswordModal from '../Modal/ChangePasswordModal';
import EditProfileModal from '../Modal/EditProfileModal';

const EditProfile = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  if (openPassword) {
    return <ChangePasswordModal />;
  }
  return (
    <>
      {openModal && <EditProfileModal user={user} />}
      <Wrapper>
        <div className='head'>
          <img src={user.profileimage} alt={user.name} />
          <div className='name'>
            <span>Full Name</span>
            <p>{user.name}</p>
          </div>
          <div className='email'>
            <span>Email</span>
            <p>{user.email}</p>
          </div>
        </div>
        <div className='action'>
          <button onClick={() => setOpenModal(!openModal)}>Edit Profile</button>
          <button onClick={() => setOpenPassword(!openPassword)}>
            Change Password
          </button>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    width: 70px;
    height: 74px;
    border-radius: 50%;
  }
  span {
    font-weight: 700;
  }
  .action {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    button {
      padding: 1rem;
      background-color: var(--clr-primary-1);
      color: white;
      font-size: 1.2rem;
      border: none;
      cursor: pointer;
    }
  }
  @media (min-width: 768px) {
    display: flex !important;
    flex-direction: row !important;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;
export default EditProfile;
