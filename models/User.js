const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const EmployeeSchema = require('./Employee');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters',
    },
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  hash: String,
  salt: String,
  employees: [EmployeeSchema],
});

UserSchema.plugin(uniqueValidator);

UserSchema.path('email').validate(function (email) {
  let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'The email is not valid.');

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    },
    'secret'
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

UserSchema.methods.current = function () {
  return {
    _id: this._id,
    email: this.email,
    username: this.username,
  };
};

module.exports = mongoose.model('User', UserSchema);
