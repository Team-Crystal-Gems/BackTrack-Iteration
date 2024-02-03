import { models } from '../models/model.js';
import { getSpotifyToken } from '../spotifyTokenRefresh.js';

const spotifyController = {};

spotifyController.getTrackImage = async (req, res, next) => {
  const tracks = (res.locals.topTracks) ? res.locals.topTracks : res.locals.topTracksByYear;
  for (const track of tracks) {
    if (!track.image_url || !track.audio_clip_url) {
        const uri = track.uri
        const token = await getSpotifyToken();
        const response = await fetch(
            `https://api.spotify.com/v1/tracks/${uri}?market=US`,
            {
              method: 'GET',
        
              // we call the getSpotifyToken function to get the token
              // which is either cached or gets refreshed (so to speak)
              headers: { Authorization: 'Bearer ' + token },
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

spotifyController.getAlbumImage = async (req, res, next) => {
  try {
    const albums = (res.locals.topAlbums) ? res.locals.topAlbums : res.locals.topAlbumsByYear;
    const topAlbum = albums[0];
    const token = await getSpotifyToken();
    const uri = encodeURI(`search?q=album:${topAlbum.name} artist:${topAlbum.artist_name}&type=album&market=US&limit=1`);
    const response = await fetch(
      `https://api.spotify.com/v1/${uri}`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
      }
    );
    const data = await response.json();
    topAlbum.image_url=data.albums.items[0].images[0].url;
    next();
  }
  catch (error) {
    return next({
      log: 'spotifyController.getAlbumImage - error getting album image',
      status: 400,
      message: { err: 'spotifyController.getAlbumImage - error getting album image' },
    });
  }
}

export default spotifyController;