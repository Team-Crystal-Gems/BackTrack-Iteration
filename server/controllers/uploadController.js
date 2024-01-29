import { models } from '../models/model.js';

const uploadController = {};

uploadController.processFiles = async (req, res, next) => {
    try {
        for (const file of req.files) {
            if (file.mimetype === 'application/json') {
                const jsonData = JSON.parse(file.buffer.toString())
                const filteredData = jsonData.map(item => ({
                    album_name: item.master_metadata_album_album_name,
                    artist_name: item.master_metadata_album_artist_name,
                    track_name: item.master_metadata_track_name,
                    ms_played: item.ms_played,
                    reason_end: item.reason_end,
                    track_uri: item.spotify_track_uri.replace('spotify:track:', ''),
                    ts: item.ts,
                }))
                // need user_id as well so that sessions are unique to users
                await models.uploadData(filteredData, res.locals.userId);

                // add foreign key relation for sessions
            }
        }
    } catch {
        return next({
            log: 'uploadController.processFiles - error processing or uploading files',
            status: 500,
            message: { err: 'uploadController.processFiles - error processing or uploading files'},
        })
    }
}

export default uploadController