import { models } from '../models/model.js';

const artistsController = {};

artistsController.getTopArtists = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const topArtists = await models.getTopArtists(userId);
    res.locals.topArtists = topArtists;
    return next();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

artistsController.getTopArtistsByYear = async (req, res, next) => {
  const { year } = req.query;
  const userId = res.locals.userId;
  try {
    const topArtistsByYear = await models.getTopArtistsByYear(year, userId);
    res.locals.topArtistsByYear = topArtistsByYear;
    return next();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

artistsController.getTopArtistsByYearByMonth = async (req, res, next) => {
  const { year } = req.query;
  try {
    const topArtistsByYearByMonth = await models.getTopArtistsByYearByMonth(year);
    res.locals.topArtistsByYearByMonth = topArtistsByYearByMonth;
    return next();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export default artistsController;
