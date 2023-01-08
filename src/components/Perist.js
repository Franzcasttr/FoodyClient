import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';
import { refreshtoken } from '../actions/auth';
import Loading from '../utils/Loading';

export const PersistLogin = () => {
  const { token, tokenLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(refreshtoken());
    }
  }, []);

  return tokenLoading ? <Loading /> : <Outlet />;
};
