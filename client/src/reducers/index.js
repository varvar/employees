import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import employees from './employees';

export default combineReducers({
  auth,
  employees,
  form: formReducer,
});
