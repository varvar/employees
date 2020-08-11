const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  async index(req, res, next) {
    try {
      const {
        payload: { id },
      } = req;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          errors: {
            user: 'not found',
          },
        });
      }
      return res.json(user.employees);
    } catch (error) {
      return next(error);
    }
  },

  async find(req, res, next) {
    try {
      const {
        payload: { id },
      } = req;

      const criteria = req.params.criteria;
      const prop = req.params.prop;

      const user = await User.findOne(bildQuery(id, criteria, prop), {
        'employees.$.': 1,
      });
      if (!user) {
        return res.status(400).json([]);
      }
      return res.json(user.employees);
    } catch (error) {
      return next(error);
    }
  },

  async add(req, res, next) {
    try {
      const {
        payload: { id },
      } = req;

      const employee = req.body;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          errors: {
            user: 'not found',
          },
        });
      }
      //Modify new employee object
      employee.hired = new Date(Date.now()).toISOString();
      employee.employeeId = Date.now();
      user.employees.push(employee);
      await user.save();

      const savedEmployee = user.employees
        .filter((employee) => {
          return employee.firstName === req.body.firstName;
        })
        .pop();

      res.json(savedEmployee);
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      const {
        payload: { id },
      } = req;
      const employeeId = req.params.id;
      const employeeProps = req.body;

      //Modify employee object
      let employeeObj = {};
      for (const key in employeeProps) {
        employeeObj[`employees.$.${key}`] = employeeProps[key];
      }

      const update = await User.updateOne(
        { _id: id, 'employees._id': employeeId },
        {
          $set: employeeObj,
        }
      );

      const updatedEmployee = await User.find(
        {
          _id: id,
          'employees._id': employeeId,
        },
        {
          'employees.$.': 1,
        }
      );

      res.json(updatedEmployee[0].employees[0]);
    } catch (error) {
      return next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const {
        payload: { id },
      } = req;
      const employeeId = req.params.id;

      await User.findOneAndUpdate(
        { _id: id, 'employees._id': employeeId },
        { $pull: { employees: { _id: employeeId } } }
      );

      res.status(204).send();
    } catch (error) {
      return next(error);
    }
  },
};

const bildQuery = (userId, criteria, prop) => {
  const query = {
    _id: userId,
  };
  query[`employees.${criteria}`] = prop;
  return query;
};
