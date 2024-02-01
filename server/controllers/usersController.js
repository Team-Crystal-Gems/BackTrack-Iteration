import { models } from '../models/model.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.server' });
const usersController = {};

usersController.createUser = async (req, res, next) => {
  console.log('INSIDE USERS CONTROLLER');
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ err: 'Please fill in all empty fields' });
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword, 'password hash');
    const user = await models.createUser(
      req.body.email,
      hashedPassword,
      req.body.name
    );
    console.log('Created user in database');
    res.locals.userId = user.id;
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'userController.addUser - error creating user',
      status: 400,
      message: { err: 'userController.addUser - error creating user' },
    });
  }
};

usersController.authUser = async (req, res, next) => {
  try {
    console.log('INSIDE AUTH CONTROLLER');
    const { email, password } = req.body;
    console.log('EMAIL:  ', email);
    console.log('password:  ', password);
    const user = await models.authUser(email);
    const result = await bcrypt.compare(password, user.password);
    if (user && result) {
      res.locals.userId = user.id;
      next();
    } else {
      throw new Error();
    }
  } catch {
    return next({
      log: 'userController.authUser - error authenticating user',
      status: 401,
      message: { err: 'userController.authUser - error authenticating user' },
    });
  }
};

usersController.createJWT = (req, res, next) => {
  console.log('entered JWT middleware');
  const SECRET_KEY = process.env.JWT_KEY;
  const token = JWT.sign({ userId: res.locals.userId }, SECRET_KEY, {
    expiresIn: '1h',
  });
  res.locals.jwt = token;
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600000,
  });
  return next();
};

usersController.verifyJWT = (req, res, next) => {
  const SECRET_KEY = process.env.JWT_KEY;
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }
  try {
    const decoded = JWT.verify(token, SECRET_KEY);
    res.locals.userId = decoded.userId;
    return next();
  } catch {
    return next({
      log: 'userController.verifyJWT - error verifying token',
      status: 400,
      message: { err: 'userController.verifyJWT - error verifying token' },
    });
  }
};

usersController.googleOAuthLogin = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).send('Authorization header is missing');
    }
    const accessToken = authHeader.split(' ')[1];
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Google API responded with status: ${response.status}`);
    }
    const user = await response.json();
    const appUser = await models.checkOAuth(user.sub);
    if (appUser) {
      res.locals.userId = user.id;
      next();
    } else {
      await models.createOAuthUser(user.email, user.name, user.sub, 'Google');
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing your request.');
  }
};

usersController.getUserName = (req, res, next) => {
  models
    .getUserName(res.locals.userId)
    .then((data) => {
      res.locals.userName = data[0].name;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'userController.getUserName - error querying name from users table',
        status: 400,
        message: { err: JSON.stringify(err) },
      });
    });
};

export default usersController;
