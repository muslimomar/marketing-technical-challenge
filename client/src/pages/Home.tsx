import React, {useEffect, useState} from 'react';
import ImageGrid from '../components/ImageGrid';
import {Image} from '../interfaces/image.interface';
import axios from 'axios';

const Home: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        axios.get('/images')
            .then((response) => {
                setImages(response.data);
            });
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || !files.length) {
            return;
        }

        const formData = new FormData();
        formData.append('image', files[0]);

        axios.post('/images', formData)
            .then((response) => setImages([...images, response.data]));
    };

    return (
        <main className="main">
            <h1 className="main__title">Connect people & spaces</h1>
            <div className="grid">
                {images.map((image, index) => (
                    <ImageGrid key={image.imagePath} image={image} index={index}/>
                ))}
            </div>
            <div>
                <input type="file" name="image" onChange={handleFileChange}/>
            </div>
        </main>
    );
};

export default Home;
