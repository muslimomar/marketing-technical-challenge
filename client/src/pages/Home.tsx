import React, {useEffect, useState} from 'react';
import ImageGrid from '../components/ImageGrid';
import {Image} from '../interfaces/image.interface';
import axios, {AxiosError} from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ErrorResponse} from "../interfaces/api.interface";

const Home: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);

    const handleError = (error: AxiosError<ErrorResponse>) => {
        const errors = error.response!.data.errors;
        errors.forEach((elem) => toast.error(elem.message));
    }

    useEffect(() => {
        axios.get('/images')
            .then((response) => {
                setImages(response.data);
            })
            .catch(handleError);
    }, []);

    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const handleClick = (_: React.MouseEvent<HTMLButtonElement>) => {
        hiddenFileInput.current!.click();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];

        if (!uploadedFile) return;

        const formData = new FormData();
        formData.append('image', uploadedFile);

        axios.post('/images', formData)
            .then(({data}) => {
                const newImage: Image = data;
                setImages(prev => [...prev, newImage]);
            })
            .catch(handleError);
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
                    accept="image/png, image/jpeg, image/jpg"
                />
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </main>
    );
};

export default Home;
