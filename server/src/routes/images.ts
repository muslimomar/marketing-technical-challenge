import express from 'express';
import {getImages, uploadImage} from "../controllers/images-controller";
import upload from "../middlewares/upload";

const router = express.Router();

router.get('/', getImages);

router.post('/', upload.single('image'), uploadImage);

export default router;