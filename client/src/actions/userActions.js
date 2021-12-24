import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const { data } = await axios.post(
      'http://127.0.0.1:8000/api/login/',
      formData,
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL });
  }
};

export const logout = () => {
  localStorage.removeItem('userInfo');
  return {
    type: USER_LOGOUT,
  };
};
