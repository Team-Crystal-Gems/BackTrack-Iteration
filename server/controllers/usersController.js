import { models } from '../models/model.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.server' });
const usersController = {};

usersController.createUser = async (req, res, next) => {
  console.log('INSIDE USERS CONTROLLER');
    if (!req.body.email || !req.body.password) return res.status(400).json({err: "Please fill in all empty fields"})
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      console.log(hashedPassword, 'password hash')
      await models.createUser(req.body.email, hashedPassword, req.body.name)
      console.log('Created user in database')
      return next();
    } catch(err) {
      console.log(err)
      return next({
          log: 'userController.addUser - error creating user',
          status: 400,
          message: { err: 'userController.addUser - error creating user'},
      })
    }

}

usersController.authUser = async (req, res, next) => {
  console.log('INSIDE AUTH CONTROLLER');
  const {email, password} = req.body
  console.log('EMAIL:  ', email);
  console.log('password:  ', password);
  const user = await models.authUser(email)
  const result = await bcrypt.compare(password, user.password)
  if (user && result) {
    res.locals.userId = user.id;
    next();
  } else {
    return next({
      log: 'userController.authUser - error authenticating user',
      status: 401,
      message: {err: 'userController.authUser - error authenticating user'}
    })
  }
}

usersController.createJWT = (req, res, next) => {
  const SECRET_KEY = process.env.JWT_KEY;
  const token = JWT.sign(
    { userId: res.locals.userId },
    SECRET_KEY,
    { expiresIn: '1h' }
  )
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 3600000
  });
  return next();
}

usersController.verifyJWT = (req, res, next) => {
  const SECRET_KEY = process.env.JWT_KEY;
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login')
  }
  try {
    const decoded = JWT.verify(token, SECRET_KEY);
    res.locals.userId = decoded;
  } catch {
    return next({
      log: 'userController.verifyJWT - error verifying token',
      status: 400,
      message: {err: 'userController.verifyJWT - error verifying token'}
    })
  }
}

export default usersController;