import {
  CREATE_USER_REVIEW_FAIL,
  CREATE_USER_REVIEW_REQUEST,
  CREATE_USER_REVIEW_SUCESS,
  GET_USER_ADDRESS_FAIL,
  GET_USER_REVIEW_REQUEST,
  GET_USER_REVIEW_SUCCESS,
} from '../../Constants/actionTypes';

const initialState = {
  reviewsLoading: false,
  reviewError: false,
  userReviewsError: '',
  userReviews: [],
  myReviews: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REVIEW_REQUEST:
      return { ...state, reviewsLoading: true };

    case CREATE_USER_REVIEW_SUCESS:
      return { ...state, reviewsLoading: false, userReviews: action.payload };

    case CREATE_USER_REVIEW_FAIL:
      return {
        ...state,
        reviewsLoading: false,
        reviewError: true,
        userReviewsError: action.payload,
      };

    case GET_USER_REVIEW_REQUEST:
      return { ...state, reviewsLoading: true };

    case GET_USER_REVIEW_SUCCESS:
      return { ...state, reviewsLoading: false, myReviews: action.payload };

    case GET_USER_ADDRESS_FAIL:
      return {
        ...state,
        reviewsLoading: false,
        reviewError: true,
        userReviewsError: action.payload,
      };

    default:
      return state;
  }
};

export default reviewReducer;
