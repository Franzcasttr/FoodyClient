import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri';
import styled from 'styled-components';

function getStar(value) {
  switch (value) {
    case 0:
      return <RiStarLine />;

    case 50:
      return <RiStarHalfFill />;

    case 100:
      return <RiStarFill />;
  }
}

function getStarsValue(value) {
  switch (parseFloat(value)) {
    case 0.0:
      return [0, 0, 0, 0, 0];

    case 0.5:
      return [50, 0, 0, 0, 0];

    case 1:
      return [100, 0, 0, 0, 0];
    case 1.0:
      return [100, 0, 0, 0, 0];
    case 1.1:
      return [100, 0, 0, 0, 0];
    case 1.2:
      return [100, 0, 0, 0, 0];
    case 1.3:
      return [100, 0, 0, 0, 0];
    case 1.4:
      return [100, 0, 0, 0, 0];

    case 1.5 || 1.6:
      return [100, 50, 0, 0, 0];
    case 1.6:
      return [100, 50, 0, 0, 0];

    case 1.7:
      return [100, 50, 0, 0, 0];
    case 1.8:
      return [100, 50, 0, 0, 0];
    case 1.9:
      return [100, 100, 0, 0, 0];
    case 2:
      return [100, 100, 0, 0, 0];
    case 2.0:
      return [100, 100, 0, 0, 0];
    case 2.1:
      return [100, 100, 0, 0, 0];
    case 2.2:
      return [100, 100, 0, 0, 0];
    case 2.3:
      return [100, 100, 0, 0, 0];
    case 2.4:
      return [100, 100, 0, 0, 0];

    case 2.5:
      return [100, 100, 50, 0, 0];
    case 2.6:
      return [100, 100, 50, 0, 0];

    case 2.7:
      return [100, 100, 50, 0, 0];
    case 2.8:
      return [100, 100, 50, 0, 0];
    case 2.9:
      return [100, 100, 50, 0, 0];
    case 3:
      return [100, 100, 100, 0, 0];
    case 3.0:
      return [100, 100, 100, 0, 0];
    case 3.1:
      return [100, 100, 100, 0, 0];
    case 3.2:
      return [100, 100, 100, 0, 0];
    case 3.3:
      return [100, 100, 100, 0, 0];
    case 3.4:
      return [100, 100, 100, 0, 0];

    case 3.5:
      return [100, 100, 100, 50, 0];
    case 3.6:
      return [100, 100, 100, 50, 0];

    case 3.7:
      return [100, 100, 100, 50, 0];
    case 3.8:
      return [100, 100, 100, 50, 0];
    case 3.9:
      return [100, 100, 100, 50, 0];
    case 4:
      return [100, 100, 100, 100, 0];
    case 4.0:
      return [100, 100, 100, 100, 0];
    case 4.1:
      return [100, 100, 100, 100, 0];
    case 4.2:
      return [100, 100, 100, 100, 0];
    case 4.3:
      return [100, 100, 100, 100, 0];
    case 4.4:
      return [100, 100, 100, 100, 0];

    case 4.5:
      return [100, 100, 100, 100, 50];
    case 4.6:
      return [100, 100, 100, 100, 50];

    case 4.7:
      return [100, 100, 100, 100, 50];
    case 4.8:
      return [100, 100, 100, 100, 50];
    case 4.9:
      return [100, 100, 100, 100, 50];
    case 5.0:
      return [100, 100, 100, 100, 100];
  }
}

const StarRating = ({ value }) => {
  return (
    <Ratings>
      {getStarsValue(value).map((value, i) => {
        return (
          <div className='stars-ratings' key={i}>
            {getStar(value)}
          </div>
        );
      })}
    </Ratings>
  );
};

const Ratings = styled.div`
  .stars-ratings {
    display: inline-flex;
    color: var(--clr-price);
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    .stars-ratings {
      font-size: 2rem;
    }
  }
`;

export default StarRating;
