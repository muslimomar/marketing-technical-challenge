import {Response, Request} from "express";
import fs from 'node:fs/promises';
import path from 'path';
import {BadRequestError} from "../errors/bad-request-error";
interface Article {
    title: string;
    description: string;
}

export const getImages = async (req: Request, res: Response) => {

    const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
    const ARTICLES_FILE_PATH = path.join(__dirname, '..', 'data', 'articles.json');

    const [images, articlesString] = await Promise.all([
        fs.readdir(IMAGES_DIR),
        fs.readFile(ARTICLES_FILE_PATH, 'utf8'),
    ]);

    const articles: Article[] = JSON.parse(articlesString);

    const getArticleForImage = (index: number) => {
        // get an article for the image, based on the index, if out of articles, use a random article.
        const randomIndex = Math.floor(Math.random() * articles.length);
        return articles[index] || articles[randomIndex];
    }

    const mappedImages = images.map((imageName, i) => {
        const article = getArticleForImage(i);

        const imagePath = `/images/${imageName}`;

        return {
            imagePath,
            article
        };
    });

    res.json(mappedImages);
}

export const uploadImage = async (req: Request, res: Response) => {
    if (!req.file) throw new BadRequestError('Please provide an image');

    res.json({image: req.file?.filename});
}