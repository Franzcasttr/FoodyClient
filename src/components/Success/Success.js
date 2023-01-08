import styled from 'styled-components';
import SuccessSVG from '../../assets/SVGS/Success.js';

const Success = () => {
  return (
    <Wrapper className='section-center'>
      <div className='success'>
        <SuccessSVG />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .success {
    display: grid;
    place-items: center;
    margin: 2rem 0;

    svg {
      width: 20rem;
      height: 20rem;
    }
  }
`;
export default Success;
