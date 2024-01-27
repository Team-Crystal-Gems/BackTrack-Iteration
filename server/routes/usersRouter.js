import express from 'express';
const router = express.Router();
import usersController from '../controllers/usersController.js';

router.post(
  '/login',
  usersController.authUser,
  usersController.createJWT,
  (req, res) => {
    res.sendStatus(200);
  }
);

router.post('/signup', usersController.createUser, (req, res) => {
  res.sendStatus(200);
});

router.post('/oauth', usersController.oauthLogin);

export default router;
