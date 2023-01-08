import axios from 'axios';
import { store } from '..';

export const API = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    if (!config.headers['Authorization']) {
      const { token } = store.getState().auth;

      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const prev = error?.config;
    if (error.response.status === 403 && !prev.sent) {
      prev.sent = true;
      const { data } = await refreshToken();
      const newAccessToken = data.accessToken;

      prev.headers['Authorization'] = `Bearer ${newAccessToken}`;

      return API(prev);
    }
    return Promise.reject(error);
  }
);

//auth
export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);
export const forgotPassword = (payload) =>
  API.post('/auth/forgotPassword', payload);
export const logoutUser = () => API.delete('/auth/logout');
export const updateUser = (form) =>
  API.post('/auth/update-user', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

//user
export const showUser = () => API.get('/user/showMe');
export const changePassword = (payload) =>
  API.patch('/user/changePassword', payload);
export const createAddress = (payload) =>
  API.post('/address/create', { payload });
export const getAddress = () => API.get('/address/useraddress');
export const updateAddress = (payload) =>
  API.patch('/address/updateAddress', { payload });
export const removeUserAddress = (_id) =>
  API.delete(`/address/removeUserAddress/${_id}`);

//refresh token
export const refreshToken = () => API.get('/refresh/');

//favorites
export const addToFavorite = (product) =>
  API.post('/favorite/addToFavorite', product);
export const getUserFavorite = () => API.get('/favorite/getUserFavorite');
export const removeFromFavorite = (id) => API.delete(`/favorite/${id}`);

//order
export const createUserOrder = (payload) =>
  API.post('/order/createOrder', payload);
export const getUserOrder = () => API.get('/order/getUserOrders');

export const createPayment = (payload) =>
  API.post('/order/createPaymentIntent', payload);

//product
export const getAllProduct = () => API.get('/product');
export const getProductBySearch = ({ search, sort }) =>
  API.get(`/product/search?searchQuery=${search}&sort=${sort}`);

export const getProductByCategory = ({ category, sort }) =>
  API.get(`/product/category?category=${category}&sort=${sort}`);

export const getProductBySearch2 = ({ search, sort, catalog }) =>
  API.get(
    `/product/search?searchQuery=${search}&catalog=${catalog}&sort=${sort}`
  );
export const getSingleProduct = (id) => API.get(`/product/${id}`);
export const getSingleProductReview = (id) => API.get(`/review/${id}/reviews`);

//reviews
export const createUserReview = (payload) =>
  API.post('/review/createReview', payload);
export const getUserReviews = () => API.get('/review/getUserReviews');

//categories
export const fetchcategory = () => API.get('/category/fetchCategory');

//cart
export const createOrder = (cartItems) =>
  API.post('/cart/addtocart', { cartItems });
export const getUserCart = () => API.get('/cart/usercart');
export const removeUserCart = (payload) => API.post('/cart/delete', payload);
export const clearCart = () => API.delete('/cart/clearCart');
