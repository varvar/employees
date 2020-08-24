import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

// React Notification
import { NotificationManager } from 'react-notifications';

class Signup extends Component {
  componentDidUpdate() {
    if (this.props.created) {
      NotificationManager.success(
        `User ${this.props.created.username} created successfully!`,
        'Successful!',
        7000
      );
    }
  }
  onSubmit = (formProps) => {
    this.props.signup(formProps, () => {
      this.props.history.push('/signin');
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <form className="col s12" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="row">
            <fieldset className="input-field col s6 offset-s3">
              <label>Username</label>
              <Field
                name="username"
                type="text"
                component="input"
                autoComplete="none"
                className="validate"
              />
            </fieldset>
          </div>
          <div className="row">
            <fieldset className="input-field col s6 offset-s3">
              <label>Email</label>
              <Field
                name="email"
                type="text"
                component="input"
                autoComplete="none"
                className="validate"
              />
            </fieldset>
          </div>
          <div className="row">
            <fieldset className="input-field col s6 offset-s3">
              <label>Password</label>
              <Field
                name="password"
                type="password"
                component="input"
                autoComplete="none"
                className="validate"
              />
            </fieldset>
          </div>
          <div className="row">
            <div className="col s6 offset-s3 card-panel">
              <span className="red-text text-accent-4">
                {this.props.errorMessage}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col s6 offset-s3">
              <button className="btn waves-effect waves-light">
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage, created: state.auth.created };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(Signup);
