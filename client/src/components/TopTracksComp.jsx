import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import { setChosenTrack} from '../features/slice.js';
// import store from '../store/store.js';
import { useDispatch, useSelector } from 'react-redux';
import playIcon from '../../assets/play_icon.png';
import pauseIcon from '../../assets/pause_icon.png';



const TopTracksComp = () => {

  const {
    year,
    default: defaultYear,
    status: statusYear,
    error: errorYear
  } = useSelector(state => state.chosen);

  const {
    name: chosenTrack,
    image_url: chosenTrackImage,
    artist_name: chosenTrackArtistName,
    album_name: chosenTrackAlbumName,
  } = useSelector(state => state.chosen.track);

  const { arrData: topTracks, status: statusTopTracks, error: errorTopTracks } = useSelector(state => state.topTracks);

  // setting tracks to either topTracks or topTracksByYear depending on the year selected.
  // then this gets served to the component that renders the tracks.

  const dispatch = useDispatch();
  const [audio, setAudio] = useState(null);
  const [isClickedId, setIsClickedId] = useState(null);
  const [endClipTimeout, setEndClipTimeout] = useState(null);

  const controlImage = (track) => {
    // console.log('controlImage in TopTracksComp.jsx');
    dispatch(setChosenTrack(track))
  }

  //
  // useEffect(() => {
  //   // Dispatch the fetchTracks async thunk when the component mounts
  //   if (statusTopTracks === 'idle') {
  //     dispatch(fetchTopTracks(year));
  //   }
  // }, [dispatch, statusTopTracks]);

   const controlPlayback = (previewUrl, trackId, imageUrl, albumName, artistName) => {

    // For now, in the cases when the previewUrl is null as it sometimes is. 2024-01-12_05-10-PM PST.
    if (!previewUrl) return;

    const fadeAudio = (audio, increment, delay, callback) => {
      const fade = setInterval(() => {
        if((increment > 0 && audio.volume < 0.07) || (increment < 0 && audio.volume > 0.005)){
          audio.volume += increment;
        } else {
          clearInterval(fade);

          if(callback) callback();
        }
      }, delay);
    }

    if (isClickedId === trackId && audio) {
      fadeAudio(audio, -0.005, 125, () => {
        audio.pause();
        audio.currentTime = 0;
        setIsClickedId(null);
      });
      return;
    }

    setIsClickedId(trackId);

    // function to fade the audio in or out


    const playAudio = () => {
      setIsClickedId(trackId);
      const newAudio = new Audio(previewUrl);
      newAudio.volume = 0.0;
      newAudio.play();

      // Fade in audio
      fadeAudio(newAudio, 0.005, 125);

      // Start fading out after 28 seconds, as the clips are 30 seconds.
      const endClipTimeout = setTimeout(() => {
        fadeAudio(newAudio, -0.005, 125, () => {
          newAudio.pause();
          newAudio.currentTime = 0;
          setIsClickedId(null);
        });
      }, 20000);

      // Save the new audio and endClipTimeout in state
      setAudio(newAudio);
      setEndClipTimeout(endClipTimeout);
    }
    // this will
    if (audio) {
      // Stop the fade out process if it hasn't started yet
      clearTimeout(endClipTimeout);

      // Fade out
      fadeAudio(audio, -0.005, 250, () => {
        audio.pause();
        audio.currentTime = 0;
      });

      setTimeout(playAudio, 1000); // 1 second delay
    } else {
      playAudio();
    }
  }
  function TrackElement({ track, controlPlayback, controlImage, isClickedId, setIsClickedId }) {
    return (
      <li>
        <img src={playIcon} alt="" style={isClickedId === track.id ? {display: 'none'} : {display: 'block'}}/>
        <img src={pauseIcon} alt="" style={isClickedId === track.id ? { display: 'block' } : { display: 'none' }} />
        <div className="trackScrollWrapper">
          <div className={isClickedId === track.id ? 'onPlay' : 'tracks'} >
            <div onClick={() => {
              controlPlayback(track.audio_clip_url, track.id, track.image_url, track.album_name, track.artist_name)
              &
              controlImage(track)
              if (isClickedId === track.id) {
                setIsClickedId(null);
              } else {
                setIsClickedId(track.id);
              }
            }}>
            {track.name} - {track.artist_name}
            </div>
            <div onClick={() => controlPlayback(track.audio_clip_url, track.id, track.image_url, track.album_name, track.artist_name)}>
            {track.name} - {track.artist_name}
            </div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <div className="TopTracksAndImageContainer">
    <div className="TopTracksContainer">
      <h3>Top 10 Tracks</h3>
      <ul>
        {topTracks.map(track => (
          <TrackElement
            key={track.id}
            track={track}
            controlPlayback={controlPlayback}
            controlImage={controlImage}
            isClickedId={isClickedId}
            setIsClickedId={setIsClickedId}
          />
        ))}
      </ul>
    </div>
    <div className="trackImage">
      <div className="trackImageCard">
        <img src={chosenTrackImage} alt="image" />
        <h4>{chosenTrackArtistName} <br /> {chosenTrackAlbumName}</h4>
      </div>
    </div>
  </div>
  )
}

export default TopTracksComp;
