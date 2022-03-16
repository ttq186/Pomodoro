import axios from 'axios';

import {
  USER_LOGIN_FAIL,
  USER_GET_USER_INFO,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_UPDATE_USER_INFO,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_TOKEN_HAS_EXPIRED,
  USER_PASSWORD_RESET_FAIL,
  USER_PASSWORD_RESET_SUCCESS,
  USER_GET_USER_INFO_FAILED,
} from '../constants/userConstants';
import { getErrorMessageFromServer, getRequestConfig } from '../utils';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = getRequestConfig();
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const { data } = await axios.post(
      `${BASE_URL}/api/login/`,
      formData,
      config
    );

    localStorage.setItem('tokenData', JSON.stringify(data));
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = getErrorMessageFromServer(error);
    dispatch({ type: USER_LOGIN_FAIL, payload: errorMessage });
  }
};

export const logout = () => async (dispatch) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  dispatch({ type: USER_LOGOUT_REQUEST });
  localStorage.removeItem('tokenData');
  await delay(500);
  dispatch({ type: USER_LOGOUT_SUCCESS });
};

export const signUp = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });

    const config = getRequestConfig();
    await axios.post(`${BASE_URL}/api/users/`, { email, password }, config);

    dispatch({ type: USER_SIGNUP_SUCCESS });
  } catch {
    dispatch({ type: USER_SIGNUP_FAIL });
  }
};

export const getUserInfo = () => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);

    const { data } = await axios.get(`${BASE_URL}/api/users/me`, config);
    const userInfo = {
      username: data[0].username,
      email: data[0].email,
    };
    dispatch({ type: USER_GET_USER_INFO, payload: userInfo });
  } catch (error) {
    const errorMessage = getErrorMessageFromServer(error);
    if (errorMessage === 'Token has expired!') {
      alert('Your working session has timed out. Please sign in again!');
      localStorage.removeItem('tokenData');
      dispatch({ type: USER_TOKEN_HAS_EXPIRED });
      return;
    }
    dispatch({ type: USER_GET_USER_INFO_FAILED });
  }
};

export const updateUserInfo = (updatedUserInfo) => async (dispatch) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    const config = getRequestConfig(tokenData.accessToken);

    const { data } = await axios.put(
      `${BASE_URL}/api/users/me`,
      updatedUserInfo,
      config
    );
    dispatch({ type: USER_UPDATE_USER_INFO, payload: data });
  } catch {}
};

export const loginViaGoogle = (tokenId) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = getRequestConfig();

    const { data } = await axios.post(
      `${BASE_URL}/api/login/google`,
      { tokenId },
      config
    );

    localStorage.setItem('tokenData', JSON.stringify(data));
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = getErrorMessageFromServer(error);
    dispatch({ type: USER_LOGIN_FAIL, payload: errorMessage });
  }
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    const config = getRequestConfig();

    const { data } = await axios.post(
      `${BASE_URL}/api/users/forgot-password`,
      { email },
      config
    );

    dispatch({ type: USER_PASSWORD_RESET_SUCCESS, payload: data.detail });
  } catch (error) {
    const errorMessage = getErrorMessageFromServer(error);
    dispatch({ type: USER_PASSWORD_RESET_FAIL, payload: errorMessage });
  }
};

export const resetPasswordConfirm =
  (id, token, newPassword) => async (dispatch) => {
    try {
      const config = getRequestConfig();

      const { data } = await axios.post(
        `${BASE_URL}/api/users/reset-password/${id}/${token}`,
        { password: newPassword },
        config
      );

      dispatch({ type: USER_PASSWORD_RESET_SUCCESS, payload: data.detail });
    } catch (error) {
      const errorMessage = getErrorMessageFromServer(error);
      dispatch({ type: USER_PASSWORD_RESET_FAIL, payload: errorMessage });
    }
  };
