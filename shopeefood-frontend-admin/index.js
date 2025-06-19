require('dotenv').config()
const express = require('express');
const path = require('path');

const app = express();

const buildDir = path.join(__dirname, '/dist');

const subDir = '/';
const logRequests = false;

if (subDir === '/') {
    console.log('The server config assuming it is serving at the server root. You can control this with the `subDir` variable in index.js.');
} else {
    console.log('The server config assuming it is serving at \'' + subDir + '\'.');
}

if (logRequests) {
    console.log('The server will log all incoming request. It\'s not recommended for production use.');
}

// Serve the static files from the React app
app.use(subDir, express.static(buildDir));
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    if (logRequests) {
        console.log(req.method + ' ' + req.url);
    }
    res.sendFile(path.join(buildDir, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log('\x1b[33m%s\x1b[0m', `==> Antd Pro Admin @nvminh162 is running on the port ${port}`)
