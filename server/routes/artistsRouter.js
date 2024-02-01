import express from 'express';
const router = express.Router();
import artistsController from '../controllers/artistsController.js';
import usersController from '../controllers/usersController.js';

router.get('/', usersController.verifyJWT, artistsController.getTopArtists, (req, res) => {
  return res.status(200).json(res.locals.topArtists);
});

router.get('/ByYear', usersController.verifyJWT, artistsController.getTopArtistsByYear, (req, res) => {
  console.log('in artistsRouter get /ByYear');
  return res.status(200).json(res.locals.topArtistsByYear);
});

// router.get('/topArtistsByYearByMonth', artistsController.getTopArtistsByYearByMonth, (req, res) => {
//   return res.status(200).json(res.locals.topArtistsByYearByMonth);
// });



// ES6 syntax
export default router;
