const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;

    const newUser = await User.findOne({ email });
    if (newUser) {
      throw new ConflictError('Этот email уже занят');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

    res.status(200).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Введены некорректные данные'));
    } else {
      next(error);
    }
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('Пользователя не существует');
    }

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('Пользователя не существует');
    }

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );

    res.status(200).send(updatedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Введены некорректные данные'));
    } else {
      next(error);
    }
  }
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const ownerId = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      ownerId,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Введены некорректные данные'));
    } else {
      next(error);
    }
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || 'dev-secret',
        { expiresIn: '7d' },
      );

      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
  login,
};
