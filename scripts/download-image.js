// This script downloads a weather camera image for the hero section

const fs = require('fs');
const https = require('https');
const path = require('path');

// Using a direct unsplash image URL for a weather monitoring camera like image
const imageUrl = 'https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=1000&auto=format&fit=crop';
const outputPath = path.join(__dirname, '../public/weather-camera.png');

// Ensure directories exist
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}

console.log(`Downloading weather camera image from ${imageUrl} to ${outputPath}...`);

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
      fs.unlinkSync(outputPath);
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