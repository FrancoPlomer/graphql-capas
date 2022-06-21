import multer from 'multer';
import path from 'path';
import logger from '../../logger.js';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const upload = multer ({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg'
        ){
            callback(null, true)
        } else{
            logger.warn('only jpg or png are supported')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

export default upload;