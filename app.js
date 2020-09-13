const fs = require('fs');
const http = require('http');
const https = require('https');
const forceSsl = require('express-force-ssl');
const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');


const httpsOptions = {
    cert: fs.readFileSync('./ssl/middleware_website.crt'),
    ca: fs.readFileSync('./ssl/middleware_website.ca-bundle'),
    key: fs.readFileSync('./ssl/middleware_website.key')
};

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);

// Uncomment before upload to server
// app.use(forceSsl);

app.use(cors());

app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/collected', require('./routes/collectData.routes'));
// app.use('/api/lead', require('./routes/AffboatData.routes'));
// app.use('/api/lead', require('./routes/WalkData.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000;
// Uncomment before upload to server
// const PORTHTTPS = config.get('portHttps') || 443;

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        httpServer.listen(PORT, () => console.log(`App has been started on port ${PORT}..`));
        // Uncomment before upload to server
        // httpsServer.listen(PORTHTTPS, () => console.log(`App has been started on port ${PORTHTTPS}..`));
    } catch (e) {
        console.log('Server Error', e.message)
    }
};
start();

