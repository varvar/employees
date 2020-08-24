import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import 'materialize-css/dist/css/materialize.min.css';
import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import EmployeesList from './components/employees/EmployeesList';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import CreateEmployee from './components/employees/CreateEmployee';
import DeleteEmployee from './components/employees/DeleteEmployee';
import EditEmployee from './components/employees/EditEmployee';
import history from './history';

// React Notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') },
  },
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/signup" component={Signup} />
          <Route path="/employees" exact component={EmployeesList} />
          <Route path="/signout" component={Signout} />
          <Route path="/signin" component={Signin} />
          <Route path="/create" component={CreateEmployee} />
          <Route path="/employees/edit/:id" exact component={EditEmployee} />
          <Route
            path="/employees/delete/:id"
            exact
            component={DeleteEmployee}
          />
          <NotificationContainer />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.querySelector('#root')
);
