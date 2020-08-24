import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_ERROR,
  CREATE_EMPLOYEE,
  CREATE_EMPLOYEE_ERROR,
  FETCH_EMPLOYEE,
  FETCH_EMPLOYEE_ERROR,
  EDIT_EMPLOYEE,
  EDIT_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_EMPLOYEE:
    case EDIT_EMPLOYEE:
    case DELETE_EMPLOYEE:
      return { ...state };
    case FETCH_EMPLOYEE:
      return { ...state, fetchedEmployee: action.payload };
    case FETCH_EMPLOYEES:
      return { ...state, employeesList: action.payload };
    case FETCH_EMPLOYEES_ERROR:
    case CREATE_EMPLOYEE_ERROR:
    case FETCH_EMPLOYEE_ERROR:
    case EDIT_EMPLOYEE_ERROR:
    case DELETE_EMPLOYEE_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
