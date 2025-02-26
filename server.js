const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up video storage
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Serve static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Upload route
app.post('/upload', upload.single('video'), (req, res) => {
    const downloadLink = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ link: downloadLink });
});

// Start the server
app.listen(port, () => {
    console.log(`✅ Video share app running at: http://localhost:${port}`);
});
