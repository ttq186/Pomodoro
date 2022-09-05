import {
  USER_LOGIN_FAIL,
  USER_SIGNUP_FAIL,
  USER_GET_USER_INFO,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_USER_INFO,
  USER_PASSWORD_RESET_FAIL,
  USER_REMOVE_MESSAGE_STATE,
  USER_GET_USER_LIST_BY_PAGE,
  USER_PASSWORD_RESET_SUCCESS,
  USER_GET_USER_LIST_BY_PAGE_FAILED,
} from '../constants/userConstants';
import { getErrorMessageFromServer } from '../utils/serverUtils';
import { apiClient } from '../apiClient';

export const removeMessageState = () => ({
  type: USER_REMOVE_MESSAGE_STATE,
});

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    const { data } = await apiClient.post('/auth', formData);
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

export const loginViaGoogle = (tokenId) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await apiClient.post('/auth/google', { tokenId });

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

    await apiClient.post('/users', { email, password });

    dispatch({ type: USER_SIGNUP_SUCCESS });
  } catch {
    dispatch({ type: USER_SIGNUP_FAIL });
  }
};

export const getUsersByPage = (page, size) => async (dispatch) => {
  try {
    const { data } = await apiClient.get(
      `/users?skip=${(page - 1) * size}&limit=${size}`
    );
    dispatch({ type: USER_GET_USER_LIST_BY_PAGE, payload: data });
  } catch {
    dispatch({ type: USER_GET_USER_LIST_BY_PAGE_FAILED });
  }
};

export const getUserInfo = () => async (dispatch) => {
  try {
    const { data } = await apiClient.get('/users/me');
    dispatch({ type: USER_GET_USER_INFO, payload: data });
  } catch {}
};

export const updateUserInfo = (updatedUserInfo) => async (dispatch) => {
  try {
    const { data } = await apiClient.put('/users/me', updatedUserInfo);
    dispatch({ type: USER_UPDATE_USER_INFO, payload: data });
  } catch {}
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    const { data } = await apiClient.post('/users/forgot-password', { email });

    dispatch({ type: USER_PASSWORD_RESET_SUCCESS, payload: data.detail });
  } catch (error) {
    const errorMessage = getErrorMessageFromServer(error);
    dispatch({ type: USER_PASSWORD_RESET_FAIL, payload: errorMessage });
  }
};

export const resetPasswordConfirm =
  (id, token, newPassword) => async (dispatch) => {
    try {
      const { data } = await apiClient.post(
        `/users/reset-password/${id}/${token}`,
        { password: newPassword }
      );

      dispatch({ type: USER_PASSWORD_RESET_SUCCESS, payload: data.detail });
    } catch (error) {
      const errorMessage = getErrorMessageFromServer(error);
      dispatch({ type: USER_PASSWORD_RESET_FAIL, payload: errorMessage });
    }
  };
