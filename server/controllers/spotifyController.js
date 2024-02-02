import { models } from '../models/model.js';
import { getSpotifyToken } from '../spotifyTokenRefresh.js';

const spotifyController = {};

spotifyController.getTrackImage = async (req, res, next) => {
  const tracks = (res.locals.topTracks) ? res.locals.topTracks : res.locals.topTracksByYear;
  for (const track of tracks) {
    if (!track.image_url || !track.audio_clip_url) {
        const uri = track.uri
        const response = await fetch(
            `https://api.spotify.com/v1/tracks/${uri}?market=US`,
            {
              method: 'GET',
        
              // we call the getSpotifyToken function to get the token
              // which is either cached or gets refreshed (so to speak)
              headers: { Authorization: 'Bearer ' + (await getSpotifyToken()) },
            }
          );
          // console.log('getTrackInfo response', response);
          const data = await response.json();
          track.image_url = data.album.images[0].url
          track.audio_clip_url = data.preview_url
    }
  }
  next();
}

export default spotifyController;