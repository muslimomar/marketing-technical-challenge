import axios from 'axios';

export const getImageUrl = (imagePath: string) => axios.defaults.baseURL + imagePath;