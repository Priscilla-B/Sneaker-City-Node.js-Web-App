const express = require('express');
const http = require('http');
const path = require('path');
const nunjucks = require('nunjucks')
const cors = require('cors');

const corsOptions = require('./config/config').corsOptions
const logEvents= require('./middleware/log-events').logEvents;
const logger= require('./middleware/log-events').logger;

const errorHandler = require('./middleware/error-handler');

const app = express();

// configure template engine
nunjucks.configure(path.join(__dirname, 'views', 'templates'), {
    autoescape: true,
    express: app
});

const PORT = process.env.PORT || 5000;


// custom middleware logger
app.use( logger)

// cross origin resource sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded data, i.e. form data
app.use(express.urlencoded({ extended: false}));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, 'views', 'static')))

// get all routes
app.use('/', require('./routes/routes'))
app.use('/shoes', require('./routes/data_routes'))

app.all('/*', (req, res) => {
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', 'templates', '404.html'))
    } else if (req.accepts('json')){
        res.json({error:"404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found");
    }
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
