import {Request, Response} from "express";
import fs from 'node:fs/promises';
import path from 'path';
import {BadRequestError} from "../errors/bad-request-error";
import {getFileNameWithoutExt} from "../utils/files";

interface Article {
    title: string;
    description: string;
}

interface Image {
    imagePath: string;
    article: Article;
}

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const ARTICLES_FILE_PATH = path.join(__dirname, '..', 'data', 'articles.json');

const getArticles = async () => {
    const articlesString = await fs.readFile(ARTICLES_FILE_PATH, 'utf8');

    const articles: Article[] = JSON.parse(articlesString);

    return articles;
}

const getArticleForImage = (articles: Article[], index?: number) => {
    // get an article for the image, based on the index, if out of articles, use a random article.
    const randomIndex = Math.floor(Math.random() * articles.length);

    if (index == null || !articles[index]) return articles[randomIndex];
    return articles[index];
}

export const getImages = async (req: Request, res: Response) => {

    const images = await fs.readdir(IMAGES_DIR);

    const articles = await getArticles();

    const mappedImages: Image[] = images.map((imageName, i) => {
        const article = getArticleForImage(articles, i);

        const imagePath = `/images/${imageName}`;

        return {
            imagePath,
            article
        };
    });

    /* sort the images ASC by their upload date */
    mappedImages.sort((a, b) => {
        return Number(getFileNameWithoutExt(b.imagePath)) - Number(getFileNameWithoutExt(a.imagePath));
    });

    /* reversed the images so new one appear at the bottom of the list */
    res.json(mappedImages.reverse());
}

export const uploadImage = async (req: Request, res: Response) => {
    if (!req.file) throw new BadRequestError('Please provide an image');

    const articles = await getArticles();
    const article = getArticleForImage(articles);

    const imagePath = `/images/${req.file?.filename}`;

    const image: Image = {imagePath, article: article}

    res.json(image);
}