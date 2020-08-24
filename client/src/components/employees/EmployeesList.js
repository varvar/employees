import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../actions';
import moment from 'moment';

class EmployeesList extends Component {
  componentDidMount() {
    this.props.fetchEmployees();
  }

  renderList(employees) {
    if (!employees) {
      return null;
    }

    return employees.map((employee) => {
      return (
        <tr key={employee._id}>
          <td>{employee._id}</td>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.position}</td>
          <td>{employee.address}</td>
          <td>{moment(employee.hired).format('DD MM YYYY')}</td>
          <td>
            <Link
              to={`/employees/edit/${employee._id}`}
              className="btn waves-effect waves-light"
              style={{ marginRight: '10px' }}
            >
              Edit
            </Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <hr />
        </div>
        <div className="row">
          <div className="col s10">
            <h5 className="center-align">Manage employees</h5>
          </div>
          <div className="col s2">
            <Link to="/create" className="btn waves-effect waves-light">
              Add New
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Position</th>
                  <th>Address</th>
                  <th>Hiring Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.renderList(this.props.employees.employeesList)}
              </tbody>
            </table>
            <div>
              {this.props.employees.errorMessage && (
                <p className="card-panel red">
                  {this.props.employees.errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  };
};

export default requireAuth(
  connect(mapStateToProps, { fetchEmployees })(EmployeesList)
);
