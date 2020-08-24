import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      this.props.history.push('/employees');
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <form className="col s12" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="row">
            <fieldset className="input-field col s6 offset-s3">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
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
                Log In!
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
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(Signin);
