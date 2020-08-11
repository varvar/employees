const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

module.exports = {
  async index(req, res, next) {
    try {
      const users = await User.find({});
      if (!users) {
        return res.sendStatus(400);
      }
      return res.json(
        users.map((user) => {
          return {
            _id: user._id,
            username: user.username,
            email: user.email,
          };
        })
      );
    } catch (error) {
      return next(error);
    }
  },

  async login(req, res, next) {
    const user = req.body;

    if (!user.email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
        },
      });
    }

    if (!user.password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }

    return passport.authenticate(
      'local',
      { session: false },
      (err, passportUser, info) => {
        if (err) {
          return next(err);
        }

        if (passportUser) {
          const user = passportUser;
          user.token = passportUser.generateJWT();

          return res.json(user.toAuthJSON());
        }

        return res.status(400).json(info);
      }
    )(req, res, next);
  },

  async current(req, res, next) {
    const {
      payload: { id },
    } = req;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.sendStatus(400);
      }
      return res.json(user.current());
    } catch (error) {
      return next(error);
    }
  },

  async create(req, res, next) {
    try {
      const user = req.body;

      if (!user.email) {
        return res.status(422).json({
          errors: {
            email: 'is required',
          },
        });
      }

      if (!user.password) {
        return res.status(422).json({
          errors: {
            password: 'is required',
          },
        });
      }

      const userInstance = new User(user);
      userInstance.setPassword(user.password);
      await userInstance.save();

      res.json(userInstance.current());
    } catch (error) {
      return next(error);
    }
  },
};
