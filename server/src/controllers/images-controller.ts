import {Response, Request} from "express";
import fs from 'node:fs/promises';
import path from 'path';
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

    const mappedImages = images.map((imageName, i) => {
        const article = articles[i];

        const imagePath = `/images/${imageName}`;

        return {
            imagePath,
            article
        };
    });

    res.json(mappedImages);
}