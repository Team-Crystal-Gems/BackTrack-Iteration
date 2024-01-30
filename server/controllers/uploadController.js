import { models } from '../models/model.js';

const uploadController = {};

uploadController.processFiles = async (req, res, next) => {


    try {
        for (const file of req.files) {
            if (file.mimetype === 'application/json') {
                console.log('After if statment')
                const jsonData = JSON.parse(file.buffer.toString())
                console.log(jsonData[16647])
                const filteredData = jsonData.filter(item => item.spotify_track_uri).map(item => ({
                    album_name: item.master_metadata_album_album_name,
                    artist_name: item.master_metadata_album_artist_name,
                    track_name: item.master_metadata_track_name,
                    ms_played: item.ms_played,
                    reason_end: item.reason_end,
                    track_uri: item.spotify_track_uri.replace('spotify:track:', ''),
                    ts: item.ts,
                }))
                console.log(filteredData[0])
                // need user_id as well so that sessions are unique to users
                // await models.uploadData(filteredData, res.locals.userId);

                // add foreign key relation for sessions
            }
        }
    } catch (error) {
        console.error(error);
        return next({
            log: 'uploadController.processFiles - error processing or uploading files',
            status: 500,
            message: { err: 'uploadController.processFiles - error processing or uploading files'},
        })
    }
}

export default uploadController