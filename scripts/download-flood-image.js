// This script downloads a flood image for the hero section

const fs = require('fs');
const https = require('https');
const path = require('path');

// Using a direct pexels image URL without query parameters
const imageUrl = 'https://images.pexels.com/photos/1756357/pexels-photo-1756357.jpeg';
const outputPath = path.join(__dirname, '../public/flood-image.jpg');

// Ensure directories exist
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}

console.log(`Downloading flood image from ${imageUrl} to ${outputPath}...`);

// Download the image
const file = fs.createWriteStream(outputPath);

https.get(imageUrl, (response) => {
  // Handle redirects
  if (response.statusCode === 301 || response.statusCode === 302) {
    console.log(`Redirecting to: ${response.headers.location}`);
    https.get(response.headers.location, (redirectResponse) => {
      redirectResponse.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log('Download completed!');
      });
    }).on('error', (err) => {
      console.error(`Error downloading image: ${err.message}`);
      file.close();
      fs.unlink(outputPath, () => {});
    });
    return;
  }
  
  if (response.statusCode !== 200) {
    console.error(`Failed to download image: ${response.statusCode}`);
    file.close();
    fs.unlink(outputPath, () => {});
    return;
  }

  response.pipe(file);

  file.on('finish', () => {
    file.close();
    console.log('Download completed!');
  });
}).on('error', (err) => {
  console.error(`Error downloading image: ${err.message}`);
  file.close();
  fs.unlink(outputPath, () => {});
}); 