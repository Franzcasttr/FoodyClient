import {
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
} from '../../Constants/actionTypes';

const initialState = {
  loading: false,
  error: '',
  categories: [],
};
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return { ...state, loading: true };

    case FETCH_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: action.payload };

    case FETCH_CATEGORY_SUCCESS:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default categoryReducer;
