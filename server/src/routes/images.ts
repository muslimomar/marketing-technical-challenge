import express from 'express';
import {getImages} from "../controllers/images-controller";

const router = express.Router();

router.get('/', getImages);

export default router;