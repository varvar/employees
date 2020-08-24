import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import history from '../history';

import {
  AUTH_USER,
  AUTH_ERROR,
  CREATE_USER,
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_ERROR,
  FETCH_EMPLOYEE,
  FETCH_EMPLOYEE_ERROR,
  EDIT_EMPLOYEE,
  EDIT_EMPLOYEE_ERROR,
  CREATE_EMPLOYEE,
  CREATE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_ERROR,
} from './types';

axios.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('token');
    if (!token) return req;
    jsonwebtoken.verify(token, 'secret', function (err) {
      if (err) {
        localStorage.removeItem('token');
        history.push('/signin');
      }
    });
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:3060/api/v1/users',
      formProps
    );

    dispatch({ type: CREATE_USER, payload: response.data });
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: e.message });
  }
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:3060/api/v1/users/login',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: '',
  };
};

export const fetchEmployees = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3060/api/v1/employees', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    dispatch({ type: FETCH_EMPLOYEES, payload: response.data });
  } catch (e) {
    dispatch({ type: FETCH_EMPLOYEES_ERROR, payload: e.message });
  }
};

export const fetchEmployee = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3060/api/v1/employees/find/_id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    dispatch({ type: FETCH_EMPLOYEE, payload: response.data[0] });
  } catch (e) {
    dispatch({ type: FETCH_EMPLOYEE_ERROR, payload: e.message });
  }
};

export const editEmployee = (id, formValues) => async (dispatch) => {
  try {
    await axios.put(
      `http://localhost:3060/api/v1/employees/update/${id}`,
      formValues,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    dispatch({ type: EDIT_EMPLOYEE, payload: {} });
    history.push('/employees');
  } catch (e) {
    dispatch({ type: EDIT_EMPLOYEE_ERROR, payload: e.message });
  }
};

export const createEmployee = (formValues) => async (dispatch) => {
  try {
    await axios.post('http://localhost:3060/api/v1/employees/add', formValues, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    dispatch({ type: CREATE_EMPLOYEE, payload: {} });
    history.push('/employees');
  } catch (e) {
    dispatch({ type: CREATE_EMPLOYEE_ERROR, payload: e.message });
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `http://localhost:3060/api/v1/employees/remove/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    dispatch({ type: DELETE_EMPLOYEE, payload: response.data[0] });
    history.push('/employees');
  } catch (e) {
    dispatch({ type: DELETE_EMPLOYEE_ERROR, payload: e.message });
  }
};
