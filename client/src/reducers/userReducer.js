import {
  USER_LOGIN_FAIL,
  USER_SIGNUP_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_GET_USER_INFO,
  USER_GET_USER_LIST,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_USER_INFO,
  USER_TOKEN_HAS_EXPIRED,
  USER_PASSWORD_RESET_FAIL,
  USER_GET_USER_INFO_FAILED,
  USER_PASSWORD_RESET_SUCCESS,
  USER_REMOVE_MESSAGE_STATE,
} from '../constants/userConstants';
import { getTokenFromLocalStorage } from '../utils';

const initialState = {
  tokenData: getTokenFromLocalStorage(),
  userInfo: {
    username: null,
    email: '@',
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...initialState,
        tokenData: getTokenFromLocalStorage(),
        loading: true,
      };

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
        tokenData: null,
        loading: false,
        isloggedInSuccess: false,
        loginErrorMessage: action.payload,
      };

    case USER_LOGOUT_REQUEST:
      return { ...initialState, loading: true, tokenData: null };

    case USER_LOGOUT_SUCCESS:
      return { ...initialState, tokenData: null };

    case USER_GET_USER_LIST:
      return { ...state, userList: action.payload };

    case USER_GET_USER_INFO:
      return { ...state, userInfo: action.payload };

    case USER_GET_USER_INFO_FAILED:
      return { ...state, isloggedInSuccess: null, isSignedUpSuccess: null };

    case USER_UPDATE_USER_INFO:
      return { ...state, userInfo: action.payload };

    case USER_SIGNUP_REQUEST:
      return { ...state, isloggedInSuccess: null };

    case USER_SIGNUP_SUCCESS:
      return { ...state, isSignedUpSuccess: true };

    case USER_SIGNUP_FAIL:
      return { ...state, isSignedUpSuccess: false };

    case USER_REMOVE_MESSAGE_STATE:
      return { ...state, errorMessage: null, successMessage: null };

    case USER_PASSWORD_RESET_FAIL:
      return { ...state, errorMessage: action.payload };

    case USER_PASSWORD_RESET_SUCCESS:
      return { ...state, successMessage: action.payload };

    case USER_TOKEN_HAS_EXPIRED:
      return {
        tokenData: null,
        userInfo: {
          username: null,
          email: '@',
        },
      };

    default:
      return state;
  }
};
