import express from 'express';
const router = express.Router();
import usersController from '../controllers/usersController.js';


router.post('/login', usersController.authUser, (req, res) => {
  res.sendStatus(200);
})

router.post('/signup', usersController.createUser, (req, res) => {
  res.redirect('/login');
})

router.post('/oauth', (req, res) => {
  res.sendStatus(200);
})

export default router