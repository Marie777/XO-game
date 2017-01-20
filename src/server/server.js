var express = require('express');
var path = require('path');

var app = express();

/**
 * Serve static files.
 */
app.use('/static', express.static('src/client/public/static'));

/**
 * All routes that are not `/static` will fall here.
 */
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

/**
 * Listen on 3000 port.
 */
app.listen(3000, function () {
    console.log('XO Game server running!')
});