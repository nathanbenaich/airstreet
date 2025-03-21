const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../images');

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Define icon sizes for PWA and Apple touch icons
const sizes = {
    pwa: [16, 32, 48, 72, 96, 144, 168, 192, 256, 384, 512],
    apple: [57, 60, 72, 76, 114, 120, 144, 152, 167, 180, 1024]
};

// Generate icons for each size
async function generateIcons() {
    try {
        // Create a new image with the brand color background
        const baseImage = await sharp({
            create: {
                width: 1024,
                height: 1024,
                channels: 4,
                background: { r: 1, g: 0, b: 97, alpha: 1 }
            }
        })
        .png()
        .toBuffer();

        const image = sharp(baseImage);

        // Generate PWA icons
        for (const size of sizes.pwa) {
            await image
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 1, g: 0, b: 97, alpha: 1 }
                })
                .toFile(path.join(OUTPUT_DIR, `icon-${size}x${size}.png`));
            
            console.log(`Generated PWA icon ${size}x${size}`);
        }

        // Generate Apple touch icons
        for (const size of sizes.apple) {
            await image
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 1, g: 0, b: 97, alpha: 1 }
                })
                .toFile(path.join(OUTPUT_DIR, `apple-touch-icon-${size}x${size}.png`));
            
            console.log(`Generated Apple touch icon ${size}x${size}`);
        }

        // Generate special case Apple touch icon (without size in filename)
        await image
            .resize(180, 180, {
                fit: 'contain',
                background: { r: 1, g: 0, b: 97, alpha: 1 }
            })
            .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon.png'));
        
        console.log('Generated default Apple touch icon');

        // Generate favicon.ico (multi-size)
        const faviconSizes = [16, 32, 48];
        const faviconBuffers = await Promise.all(
            faviconSizes.map(size => 
                image
                    .resize(size, size, {
                        fit: 'contain',
                        background: { r: 1, g: 0, b: 97, alpha: 1 }
                    })
                    .toBuffer()
            )
        );
        
        await sharp(faviconBuffers[1]) // Use 32x32 as the main favicon
            .toFile(path.join(__dirname, '../favicon.ico'));
        
        console.log('Generated favicon.ico');
    } catch (error) {
        console.error('Error generating icons:', error);
    }
}

generateIcons(); 