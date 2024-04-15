import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const cwd = process.cwd();
const videosDirectory = path.join(cwd, 'src', 'mp4');

app.use(express.static(path.join(cwd, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(cwd, 'src', 'index.html'));
});

app.get('/lol', (req, res) => {
  fs.readdir(videosDirectory, (err, files) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }

    const videoFiles = files.filter(file => file.endsWith('.mp4'));

    if (videoFiles.length === 0) {
      return res.status(404).send('No videos found');
    }

    const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];

    res.sendFile(path.join(videosDirectory, randomVideo));
  });
});

app.listen(3000);