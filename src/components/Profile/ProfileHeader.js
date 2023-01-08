import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProfileHeader = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Wrapper>
      <div className='profile-image' style={{ marginBottom: '2rem' }}>
        <img src={user.profileimage} alt='user-profile' />
      </div>
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <Link to='/edit-profile' className='edit'>
        Edit Profile
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .profile-image {
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
`;
export default ProfileHeader;
