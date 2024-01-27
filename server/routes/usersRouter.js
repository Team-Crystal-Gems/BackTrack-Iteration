import express from 'express';
const router = express.Router();
import usersController from '../controllers/usersController.js';
import uploadController from '../controllers/uploadController.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/login',
  usersController.authUser,
  usersController.createJWT,
  (req, res) => {
    // console.log('INSIDE USER ROUTER...')
    res.sendStatus(200);
  }
);

router.post('/signup', usersController.createUser, (req, res) => {
  res.sendStatus(200);
});

router.post(
  '/googleOAuth',
  usersController.googleOAuthLogin,
  usersController.createJWT,
  (req, res) => {
    res.sendStatus(200);
  }
);
router.post('/upload', upload.array('files'), uploadController.processFiles, (req, res) => {
  res.sendStatus(200);
})

router.get('/data', usersController.verifyJWT, (req, res) => {
  // console.log('ELENA USERS ROUTER: /data: RES.LOCALS.USERID:   ', res.locals.userId);
  // console.log('ELENA USERS ROUTER: /data: RES.LOCALS.USERNAME:   ', res.locals.userName);
  //   res.status(200).json({
//     user_id: res.locals.userId,
  res.sendStatus(200);
})

export default router