import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getuserreviews } from '../actions/review';
import MyReview from '../components/Reviews/MyReview';
import Loading from '../utils/Loading';

const MyReviewsPage = () => {
  const { myReviews, reviewsLoading } = useSelector((state) => state.review);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuserreviews());
  }, [dispatch]);
  if (reviewsLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <>
      <section className='section-center'>
        <MyReview reviews={myReviews} />
      </section>
    </>
  );
};

export default MyReviewsPage;
