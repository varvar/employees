import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEmployee } from '../../actions';
import EmployeeForm from './EmployeeForm';

class CreateEmployee extends Component {
  onSubmit = (formValues) => {
    this.props.createEmployee(formValues);
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col s12">
            <h5 className="center-align">Add new employee</h5>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <EmployeeForm onSubmit={this.onSubmit} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, { createEmployee })(CreateEmployee);
