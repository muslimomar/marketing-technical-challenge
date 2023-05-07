import React, {useState} from 'react';
import {Image} from '../interfaces/image.interface';
import classNames from "classnames";
import {ReactComponent as ChevronRight} from '../assets/icons/chevron-right.svg';
import {getImageUrl} from "../utils/imageUtils";

interface Props {
    image: Image;
    index: number;
}

const ImageGrid: React.FC<Props> = ({image, index}) => {
    const isFirstCard = index === 0;
    const isEveryThirdCard = index % 3 === 0;

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return (
        <div
            className={classNames('grid__item', {
                'grid__image-wide': isFirstCard || isEveryThirdCard,
                'grid__image-tall': isFirstCard,
            })}
            key={image.imagePath}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                className="grid__item__image"
                src={getImageUrl(image.imagePath)}
                alt={image.imagePath}/>
            <div className={classNames('grid__item__info', {
                'grid__item__info-hover': isHovered
            })}>
                <div>
                    <h3>{image.article.title}</h3>
                    {isHovered && <p>{image.article.description}</p>}
                </div>
                {isHovered && <button><ChevronRight/></button>}
            </div>
        </div>
    );
};

export default ImageGrid;
