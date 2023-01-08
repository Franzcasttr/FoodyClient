import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showuser } from '../actions/auth';
import { SingleFooter } from '../components';
import ForgotPassword from '../components/Register/ForgotPassword';

const ForgotPasswordPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showuser());
  }, [dispatch]);

  return (
    <section className='section-center'>
      <ForgotPassword />
      <SingleFooter />
    </section>
  );
};

export default ForgotPasswordPage;
