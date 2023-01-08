import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchallproduct } from '../actions/product';
import { ViewAllProducts } from '../components';

const Productpage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchallproduct());
  }, [dispatch]);

  return (
    <div>
      <ViewAllProducts />
    </div>
  );
};

export default Productpage;
