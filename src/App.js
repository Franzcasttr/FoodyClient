import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  CartPage,
  CheckoutPage,
  Home,
  LoginPage,
  ProfilePage,
  RegisterPage,
  SuccessPage,
} from './pages';

import Notfound from './components/404/notfound';
import SingleProductPage from './pages/SingleProductPage';
import Productpage from './pages/Productpage';
import VerificationPage from './pages/VerificationPage';
import ProtectRoutes from './pages/ProtectRoutes';
import SearchProductPage from './pages/SearchProductPage';
import RatingPage from './pages/RatingPage';
import RatingLayout from './components/ShareLayouts/RatingLayout';
import MyReviewsPage from './pages/MyReviewsPage';
import OrderPage from './pages/OrderPage';
import FavoritePage from './pages/FavoritePage';
import UserFavoritePage from './pages/Myaccount/FavoritePage';
import AddressPage from './pages/AddressPage';
import PolicyPage from './pages/PolicyPage';
import AboutPage from './pages/AboutPage';
import EditProfilePage from './pages/EditProfilePage';
import WebProfile from './pages/WebProfile';
import AccountPage from './pages/AccountPage';
import UserOrderPage from './pages/Myaccount/OrderPage';
import UserRatingLayout from './components/ShareLayouts/UserRatingLayout';
import UserMyRating from './components/Ratings/UserRating';
import UserAddressPage from './pages/Myaccount/AddressPage';
import EditUserPage from './pages/EditUserPage';
import ProductByCategory from './pages/ProductByCategoryPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { PersistLogin } from './components/Perist';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />

          <Route path='/forgotPassword' element={<ForgotPasswordPage />} />
          <Route path='/user/forgot-password' element={<ResetPasswordPage />} />
          <Route path='/user/verify-email' element={<VerificationPage />} />
          <Route path='/products' element={<Productpage />} />
          <Route path='/products/search' element={<SearchProductPage />} />
          <Route path='/products/category' element={<ProductByCategory />} />
          <Route path='/policy' element={<PolicyPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/' exact element={<Home />} />

          <Route element={<PersistLogin />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route element={<ProtectRoutes />}>
              <Route path='/my-ratings' element={<RatingLayout />}>
                <Route index element={<RatingPage />} />
                <Route path='rate' element={<RatingPage />} />
                <Route path='my-review' element={<MyReviewsPage />} />
              </Route>

              <Route path='/my-account' element={<WebProfile />}>
                <Route index element={<AccountPage />} />
                <Route path='account' element={<AccountPage />} />
                <Route path='userfavorites' element={<UserFavoritePage />} />
                <Route path='userprofile' element={<EditProfilePage />} />
                <Route path='userrate' element={<UserRatingLayout />}>
                  <Route index element={<UserMyRating />} />
                  <Route path='rate' element={<UserMyRating />} />
                  <Route path='my-review' element={<MyReviewsPage />} />
                </Route>

                <Route path='userorder' element={<UserOrderPage />} />
                <Route path='useraddress' element={<UserAddressPage />} />
              </Route>

              <Route path='/edit-profile' element={<EditUserPage />} />
              <Route path='/order' element={<OrderPage />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/success' element={<SuccessPage />} />
              <Route path='/favorites' element={<FavoritePage />} />
              <Route path='/address' element={<AddressPage />} />
            </Route>
            <Route path='/products/:id' element={<SingleProductPage />} />
          </Route>

          <Route path='*' exact element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
