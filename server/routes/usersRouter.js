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
    res.status(200).json(res.locals.jwt);
  }
);

router.post(
  '/signup',
  usersController.createUser,
  usersController.createJWT,
  (req, res) => {
    res.status(200).json(res.locals.jwt);
  }
);

router.post(
  '/googleOAuth',
  usersController.googleOAuthLogin,
  usersController.createJWT,
  (req, res) => {
    res.status(200).json(res.locals.jwt);
  }
);
router.post(
  '/upload',
  upload.array('files'),
  usersController.verifyJWT,
  uploadController.processFiles,
  (req, res) => {
    res.sendStatus(200);
  }
);
router.post(
  '/upload',
  upload.array('files'),
  usersController.verifyJWT,
  uploadController.processFiles,
  (req, res) => {
    res.sendStatus(200);
  }
);

router.get(
  '/data',
  usersController.verifyJWT,
  usersController.getUserName,
  (req, res) => {
    res.status(200).json({
      user_id: res.locals.userId,
      user_name: res.locals.userName,
    });
  }
);

export default router;
