import { models } from '../models/model.js';

const uploadController = {};

uploadController.processFiles = async (req, res, next) => {
    function splitIntoChunks(array, chunkSize = 1000) {
        const chunks = [];
        while (array.length) {
            chunks.push(array.splice(0, chunkSize));
        }
        return chunks;
    }

    try {
        for (const file of req.files) {
            if (file.mimetype === 'application/json') {
                const jsonData = JSON.parse(file.buffer.toString())
                const filteredData = jsonData.filter(item => item.spotify_track_uri).map(item => ({
                    album_name: item.master_metadata_album_album_name,
                    artist_name: item.master_metadata_album_artist_name,
                    track_name: item.master_metadata_track_name,
                    ms_played: item.ms_played,
                    reason_end: item.reason_end,
                    track_uri: item.spotify_track_uri.replace('spotify:track:', ''),
                    ts: item.ts,
                    user_id: res.locals.userId
                }))
                while (filteredData.length > 0) {
                    await models.uploadData(filteredData.splice(0, 100))
                }
                // need user_id as well so that sessions are unique to users
            }
        }
        // add foreign key relation for sessions -- NOT NEEDED
        // await models.tracksForeignKey();
        // await models.artistsForeignKey();
        // await models.albumsForeignKey();
        console.log('FINISHED UPLOADING DATA')
        return next()
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