const EventEmitter = require('events');
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./log-events');


class Emitter extends EventEmitter {};
const myEmitter = new Emitter(); 

const PORT = process.env.PORT || 5000;

const serveFile = async (filePath, contentType, response) => {
    try {
        const data = await fsPromises.readFile(filePath, 'utf-8');
        response.writeHead(200, {'Content-Type':contentType });
        response.end(data)

    } catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }


    let filePath;

    // if file is html and url is '/' get the home page
    if ( contentType === 'text/html' && req.url === '/'){
        filePath = path.join(__dirname, 'views', 'templates','home.html');
    }

    // if content type is html/text, find the file that was requested in the views/templates folder
    else if (contentType === 'text/html'){
        filePath = path.join(__dirname, 'views','templates', req.url);
    }

    // else use the directory name and the request url
    else {
        filePath = path.join(__dirname, req.url);
    };
    
    // if there's no extension and the very last character of the request url
    //  is not '/', add the .html extension
    // makes the .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
      
    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // serve the file
        serveFile(filePath, contentType, res);
    } else {
        // 404
        // 301 redirect
        console.log(path.parse(filePath));
    }

});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});



// myEmitter.on('log', (msg) => logEvents(msg)); // add listener to the log event

// setTimeout(()=> {
//     //Emit event
//     myEmitter.emit('log', 'Log event emitted!');
// }, 2000);
