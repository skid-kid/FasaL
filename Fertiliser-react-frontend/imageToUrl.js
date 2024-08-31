const axios = require('axios');
const fs = require('fs');

async function uploadImageToImgbb(apiKey, imagePath, expiration = null) {
    const url = 'https://api.imgbb.com/1/upload';

    // Read the image file as a base64 encoded string
    const imageFile = fs.readFileSync(imagePath, { encoding: 'base64' });

    const formData = new URLSearchParams();
    formData.append('key', apiKey);
    formData.append('image', imageFile);

    if (expiration) {
        formData.append('expiration', expiration);
    }

    try {
        const response = await axios.post(url, formData);
        const jsonResponse = response.data;

        if (jsonResponse.success) {
            return jsonResponse.data.url;
        } else {
            return `Error: ${jsonResponse.status} - ${jsonResponse.error.message}`;
        }
    } catch (error) {
        return `Request failed: ${error.message}`;
    }
}

// Example usage
const apiKey = 'f0977b4a4d2a5b76dac017b43e6bce29';  // Replace with your imgbb API key
const imagePath = 'D:\\programming\\python\\SIH24\\53148-3840x2160-studio-ghibli-background-image-desktop-4k.jpg';  // Replace with your image path

uploadImageToImgbb(apiKey, imagePath, 600)
    .then((imageLink) => console.log('Image uploaded:', imageLink))
    .catch((error) => console.error('Error uploading image:', error));
