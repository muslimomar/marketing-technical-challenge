import path from "path";
import multer from "multer";
import {Request} from "express";
import {BadRequestError} from "../errors/bad-request-error";

const uploadDest = path.join(__dirname, '..', 'public', 'images');

const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
]

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!whitelist.includes(file.mimetype)) {
        return cb(new BadRequestError('Invalid image provided'))
    }

    cb(null, true)
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDest)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    },
});

const upload = multer({storage, fileFilter});

export default upload;