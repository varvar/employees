import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchEmployee, editEmployee, deleteEmployee } from '../../actions';
import EmployeeForm from './EmployeeForm';

const EditEmployee = (props) => {
  useEffect(() => {
    props.fetchEmployee(props.match.params.id);
  }, []);

  const onSubmit = (formValues) => {
    props.editEmployee(props.match.params.id, formValues);
  };

  const deleteEmployee = () => {
    props.deleteEmployee(props.match.params.id);
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col s6">
          <h5 className="center-align">
            Edit {props.employee ? props.employee.firstName : 'Loading ...'}{' '}
            {props.employee ? props.employee.lastName : 'Loading ...'} record
          </h5>
        </div>
        <div className="col s6">
          <h5 className="center-align">
            <button
              onClick={() => deleteEmployee()}
              className="btn waves-effect waves-light red"
            >
              Delete {props.employee ? props.employee.firstName : 'Loading ...'}{' '}
              {props.employee ? props.employee.lastName : 'Loading ...'}
            </button>
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <EmployeeForm
            initialValues={props.employee}
            onSubmit={(formValues) => onSubmit(formValues)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { employee: state.employees.fetchedEmployee };
};

export default connect(mapStateToProps, {
  fetchEmployee,
  editEmployee,
  deleteEmployee,
})(EditEmployee);
