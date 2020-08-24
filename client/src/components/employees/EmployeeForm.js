import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import EmployeeField from './EmployeeField';
import formFields from './formFields';

class EmployeeForm extends React.Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={EmployeeField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {this.renderFields()}
          <Link to="/employees" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Submit
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'employeeForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
})(EmployeeForm);
