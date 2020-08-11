const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  employeeId: {
    type: Number,
    required: [true, 'employeeId is required'],
  },
  firstName: {
    type: String,
    required: [true, 'employee firstName is required'],
  },
  lastName: String,
  position: String,
  address: String,
  hired: {
    type: Date,
    required: true,
  },
});

module.exports = EmployeeSchema;
