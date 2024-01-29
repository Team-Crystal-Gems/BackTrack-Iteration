import express from 'express';
const router = express.Router();
import usersController from '../controllers/usersController.js';
import uploadController from '../controllers/uploadController.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/login', usersController.authUser, usersController.createJWT, (req, res) => {
  res.sendStatus(200);
})

router.post('/signup', usersController.createUser, (req, res) => {
  res.sendStatus(200);
})

router.post('/oauth', (req, res) => {
  res.sendStatus(200);
})

router.post('/upload', upload.array('files'), uploadController.processFiles, (req, res) => {
  res.sendStatus(200);
})

export default router