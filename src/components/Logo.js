import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Logo = () => {
  return (
    <Wrapper>
      <Link to='/' className='logo'>
        <h1>Foody</h1>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .logo {
    display: grid;
    place-items: center;
    padding: 1rem;

    font-weight: bold;
    color: var(--clr-primary-1);

    h1 {
      font-size: 2rem;
    }
  }
  @media (min-width: 768px) {
    .logo {
      display: flex;
      justify-content: left;
    }
  }
`;
export default Logo;
