import { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { createuserreview } from '../../actions/review';

const ReviewModal = ({ itemsId, product, setReviewModal }) => {
  const [areaValue, setAreaValue] = useState('');
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      itemsId,
      product,
      rating: rating,
      comment: areaValue,
    };

    dispatch(createuserreview(payload));
    setReviewModal(false);
  };
  return (
    <Wrapper>
      <StarWrapper>
        <div className='close' onClick={() => setReviewModal(false)}>
          <ImCross className='close-modal' />
        </div>
        {[...Array(5)].map((stars, index) => {
          index += 1;
          return (
            <button
              type='button'
              key={index}
              className={index <= (rating || hover) ? 'on' : 'off'}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}>
              <span className='star'>&#9733;</span>
            </button>
          );
        })}
      </StarWrapper>

      <p>Type {100 - areaValue.length} characters</p>
      <form>
        <textarea
          maxLength={100}
          value={areaValue}
          onChange={(e) => setAreaValue(e.target.value)}
          name='review'
          placeholder='Share your experience and help others make better choices!'></textarea>
      </form>
      <button type='submit' className='submit-btn' onClick={onSubmit}>
        Submit
      </button>
    </Wrapper>
  );
};

const StarWrapper = styled.div`
  .close {
    display: flex;
    justify-content: end;
    cursor: pointer;
  }

  .close-modal {
    color: red;
    position: fixed;
    margin-bottom: 1rem;
    font-size: 1.8rem;
    padding: 0.5rem;
    box-shadow: var(--light-shadow);
    background: var(--background);
    border-radius: 2rem;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 2rem;
    letter-spacing: 0.5rem;
    margin-bottom: 2rem;
    cursor: pointer;
  }
  .on {
    color: var(--clr-price);
  }
  .off {
    color: var(--clr-light-grey);
  }
`;

const Wrapper = styled.div`
  p {
    font-size: 1.2rem;
    color: var(--clr-light-grey3);
  }

  textarea {
    width: 70vw;

    height: 15vh;
    resize: none;
    padding: 1rem;
    max-width: 1170px;
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;

    border-radius: 19px;
    border: 1px solid var(--clr-primary-1);
    margin-bottom: 2rem;
    outline: none;
  }
  .submit-btn {
    width: 7rem;

    padding: 1rem;
    border: none;
    border-radius: 19px;
    font-size: 1.2rem;
    background: var(--clr-primary-1);
    color: white;
  }
  @media (min-width: 768px) {
    .close-modal {
      font-size: 2rem;
      background: white;
      position: relative;
    }
    textarea {
      width: 50vw !important;
    }
  }
`;
export default ReviewModal;
