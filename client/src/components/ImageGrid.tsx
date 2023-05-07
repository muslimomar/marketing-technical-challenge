import React from 'react';
import {Image} from '../interfaces/image.interface';
import classNames from "classnames";
import {ReactComponent as ChevronRight} from '../assets/icons/chevron-right.svg';

interface Props {
    image: Image;
    index: number;
}

const ImageGrid: React.FC<Props> = ({image, index}) => {
    const isFirstCard = index === 0;
    const isEveryThirdCard = index % 3 === 0;

    const imageSrc = process.env.REACT_APP_API_URL + image.imagePath;

    return (
        <div
            className={classNames('grid__item', {
                'grid__image-wide': isFirstCard || isEveryThirdCard,
                'grid__image-tall': isFirstCard,
            })}
            key={image.imagePath}
        >
            <img
                className="grid__item__image"
                src={imageSrc}
                alt={image.imagePath}/>
            <div className="grid__item__info">
                <div>
                    <h3>{image.article.title}</h3>
                    <p>{image.article.description}</p>
                </div>
                <span><ChevronRight/></span>
            </div>
        </div>
    );
};

export default ImageGrid;
