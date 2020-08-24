import { AUTH_USER, AUTH_ERROR, CREATE_USER } from '../actions/types';

const INITIAL_STATE = {
  created: '',
  authenticated: '',
  errorMessage: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, created: action.payload };
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
