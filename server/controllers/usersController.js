import { models } from '../models/model.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';


const usersController = {};

usersController.createUser = async (req, res, next) => {
    if (!req.body.email || !req.body.password) return res.status(400).json({err: "Please fill in all empty fields"})
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await models.createUser(req.body.email, hashedPassword, req.body.name)
        return next();
    } catch {
        return next({
            log: 'userController.addUser - error creating user',
            status: 400,
            message: { err: 'userController.addUser - error creating user'},
        })
    }

}

usersController.authUser = async (req, res, next) => {
  const {email, password} = req.body
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
    const SECRET_KEY = 
}

export default usersController;