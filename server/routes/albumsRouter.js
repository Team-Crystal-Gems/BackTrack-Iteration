import express from 'express';
const router = express.Router();
import albumsController from '../controllers/albumsController.js';
import usersController from '../controllers/usersController.js';
import spotifyController from '../controllers/spotifyController.js';

router.get('/', usersController.verifyJWT, albumsController.getTopAlbums, spotifyController.getAlbumImage, (req, res) => {
  return res.status(200).json(res.locals.topAlbums);
});


router.get('/ByYear', usersController.verifyJWT, albumsController.getTopAlbumsByYear, spotifyController.getAlbumImage, (req, res) => {
  return res.status(200).json(res.locals.topAlbumsByYear);
});


// router.get('/topAlbumsByYearByMonth', albumsController.getTopAlbumsByYearByMonth, (req, res) => {
//   return res.status(200).json(res.locals.topAlbumsByYearByMonth);
// });

// ES6 syntax
export default router;
