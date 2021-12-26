import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_GET_USER_INFO,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_UPDATE_USER_INFO,
} from '../constants/userConstants';

const tokenDataFromStorage = localStorage.getItem('tokenData')
  ? JSON.parse(localStorage.getItem('tokenData'))
  : null;

const initialState = {
  tokenData: tokenDataFromStorage,
  userInfo: {
    username: null,
    email: '@',
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...initialState, loading: true };

    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, tokenData: action.payload };

    case USER_LOGIN_FAIL:
      return { ...initialState, loading: false };

    case USER_LOGOUT_REQUEST:
      return { ...initialState, loading: true, tokenData: null };

    case USER_LOGOUT_SUCCESS:
      return {...initialState, tokenData: null};

    case USER_GET_USER_INFO:
      return { ...state, userInfo: action.payload };

    case USER_UPDATE_USER_INFO:
      return { ...state, userInfo: action.payload };

    default:
      return state;
  }
};
