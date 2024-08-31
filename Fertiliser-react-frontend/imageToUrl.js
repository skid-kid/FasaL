const puppeteer = require('puppeteer');
const path = require('path');

async function uploadImageWithPuppeteer(imagePath) {
    // Launch a new browser instance in fully headless mode
    const browser = await puppeteer.launch({
        headless: 'new', // 'new' ensures the latest headless mode
        executablePath: puppeteer.executablePath(), // Use Puppeteer's bundled Chromium
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--hide-scrollbars',
            '--mute-audio',
        ], // Additional args to prevent any visible UI
    });

    const page = await browser.newPage();

    try {
        // Navigate to the image uploader website
        await page.goto('https://img.doerig.dev/');

        // Wait for the file input element to be present in the DOM
        const fileInputSelector = 'input[type="file"][name="image"]';
        await page.waitForSelector(fileInputSelector);

        // Upload the file using the input file element
        const fileInput = await page.$(fileInputSelector);
        await fileInput.uploadFile(imagePath);

        // Wait for the upload button to be visible and then click it
        const uploadButtonSelector = 'button.inline-flex.justify-center.px-4.py-2'; // Adjust if needed
        await page.waitForSelector(uploadButtonSelector, { visible: true });
        await page.click(uploadButtonSelector);

        // Wait for the result URL to appear on the page
        await page.waitForSelector('a[href^="https://i.imgur.com"]', { visible: true });

        // Scrape the image URL
        const imageUrl = await page.$eval('a[href^="https://i.imgur.com"]', el => el.href);

        console.log('Image uploaded successfully. Image URL:', imageUrl);

    } catch (error) {

        console.error('Error during the upload process:', error);
        
    } finally {
        // Close the browser
        await browser.close();
    }
}

// Example usage
const imagePath = path.resolve('OIP.jpeg');  // Use the correct path to your image
uploadImageWithPuppeteer(imagePath);
