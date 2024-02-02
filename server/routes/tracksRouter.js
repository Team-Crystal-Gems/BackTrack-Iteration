import express from 'express';
const router = express.Router();
import tracksController from '../controllers/tracksController.js';
import usersController from '../controllers/usersController.js';

router.get('/', usersController.verifyJWT, tracksController.getTopTracks, (req, res) => {
  return res.status(200).json(res.locals.topTracks);
});

//Ross added this to set up a route for front end slider to get tracks by year.
router.get('/ByYear', usersController.verifyJWT, tracksController.getTopTracksByYear, (req, res) => {
  return res.status(200).json(res.locals.topTracksByYear);
});

// router.get('/topTracksByYearByMonth', tracksController.getTopTracksByYearByMonth, (req, res) => {
//   return res.status(200).json(res.locals.topTracksByYearByMonth);
// });

// ES6 syntax
export default router;


