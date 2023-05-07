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

    const hiddenFileInput = React.useRef<HTMLInputElement>(null);
    const handleClick = (_: React.MouseEvent<HTMLButtonElement>) => {
        hiddenFileInput.current!.click();
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];

        if (!uploadedFile) {
            return alert('select a file!');
        }

        const formData = new FormData();
        formData.append('image', uploadedFile);

        axios.post('/images', formData)
            .then(({data}) => {
                const newImage: Image = data;
                setImages(prev => [...prev, newImage]);
            })
            .catch((err) => {
                console.log(err);
                // TODO: handle errors
            });
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
                <button className="upload-btn" onClick={handleClick}>Upload</button>
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    className="d-none"
                />
            </div>
        </main>
    );
};

export default Home;
