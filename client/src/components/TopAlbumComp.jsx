import React, { useEffect, useState } from 'react'
import albumImagePlaceholder from '../../assets/album.png';
import { useSelector } from 'react-redux';

const TopAlbumPage = () => {
  // Using useSelector to get the chosen track's details
  const {
    image_url: chosenTrackImage,
    artist_name: chosenTrackArtistName,
    album_name: chosenTrackAlbumName,
  } = useSelector(state => state.chosen.track);

  const { arrData: topAlbums, status: statusTopAlbums, error: errorTopAlbums } = useSelector(state => state.topAlbums);

  return (
    <div className='topAlbumsDisplay'>
      <h3>And couldn't get enough of:</h3>
      <div className='albumContainer'>
        {chosenTrackImage ?
          <>
            <img src={topAlbums[0].image_url} alt="image" />
            <h4>{topAlbums[0].artist_name} <br /> {topAlbums[0].name}</h4>
          </>
          :
          <>
            <img src={albumImagePlaceholder} alt="image" />
          </>
        }
      </div>
    </div>
  );
};

// const TopAlbumPage = () => {
//   const {
//     year,
//     default: defaultYear,
//     status: statusYear,
//     error: errorYear
//   } = useSelector(state => state.chosen);

//   const {
//     name: chosenTrack,
//     image_url: chosenTrackImage,
//     artist_name: chosenTrackArtistName,
//     album_name: chosenTrackAlbumName,
//   } = useSelector(state => state.chosen.track);

//   const { arrData: topTracks, status: statusTopTracks, error: errorTopTracks } = useSelector(state => state.topTracks);
//   // console.log('topAlbums in TopAlbumPage: ', topAlbumsByYear);
//   const [album, setAlbum] = useState(null);
//   // console.log('album in TopAlbumPage:', album)

//   useEffect(() => {
//     function getFirstAlbumWithImage(topTracks) {
//       for (let track of topTracks) {
//         if (track.image_url) return track;
//       }
//       return null;
//     }
  
//     setAlbum(getFirstAlbumWithImage(topTracks));
//   }, [topAlbumsByYear, statusTopAlbumsByYear]);


//   return (
//     <div className='topAlbumsDisplay'>
//       <h3>And couldn't get enough of:</h3>
//       <div className='albumContainer'>
//       {album &&
//         <>
//           <img src={album.image_url} alt="image" />
//           <h4>{album.artist_name} <br /> {album.name}</h4>
//         </>
//       } 
//       {!album &&
//         <>
//           <img src={albumImagePlaceholder} alt="image" />
//         </>
//       }
//       </div>
//     </div>
//   )
// };

export default TopAlbumPage;





