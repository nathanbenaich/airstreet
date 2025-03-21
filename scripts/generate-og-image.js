const sharp = require('sharp');
const path = require('path');

async function generateOGImage() {
    try {
        // Create a new image with the brand color background
        const baseImage = await sharp({
            create: {
                width: 1200,
                height: 630,
                channels: 4,
                background: { r: 1, g: 0, b: 97, alpha: 1 }
            }
        })
        .composite([
            {
                input: path.join(__dirname, '../images/logo.png'),
                gravity: 'center'
            }
        ])
        .png()
        .toFile(path.join(__dirname, '../images/og-image.png'));

        console.log('Generated Open Graph image');
    } catch (error) {
        console.error('Error generating Open Graph image:', error);
    }
}

generateOGImage(); 