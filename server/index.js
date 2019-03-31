//  Modules
const http = require('http')

// Create HTTP serviceWorker
http.createServer((request, response) =>{

    // Enable CORS
    response.setHeader('Access-Control-Allow-Origin', '*')

    response.end('Hello from HTTP server')
// lissten for response
}).listen(3333, () => { console.log('Server Running')});
