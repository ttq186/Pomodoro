import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_GET_USER_INFO,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_UPDATE_USER_INFO,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_PASSWORD_RESET_FAIL,
  USER_PASSWORD_RESET_SUCCESS,
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
      return {
        ...state,
        loading: false,
        tokenData: action.payload,
        isloggedInSuccess: true,
      };

    case USER_LOGIN_FAIL:
      return {
        ...initialState,
        loading: false,
        isloggedInSuccess: false,
        loginErrorMessage: action.payload,
      };

    case USER_LOGOUT_REQUEST:
      return { ...initialState, loading: true, tokenData: null };

    case USER_LOGOUT_SUCCESS:
      return { ...initialState, tokenData: null };

    case USER_GET_USER_INFO:
      return { ...state, userInfo: action.payload };

    case USER_UPDATE_USER_INFO:
      return { ...state, userInfo: action.payload };

    case USER_SIGNUP_REQUEST: {
      return { ...state };
    }

    case USER_SIGNUP_SUCCESS:
      return { ...state, isSignedUpSuccess: true };

    case USER_SIGNUP_FAIL:
      return { ...state, isSignedUpSuccess: false };

    case USER_PASSWORD_RESET_FAIL:
      return { ...state, errorMessage: action.payload };

    case USER_PASSWORD_RESET_SUCCESS:
      return { ...state, successMessage: action.payload };

    default:
      return state;
  }
};
