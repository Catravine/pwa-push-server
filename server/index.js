//  Modules
const http = require('http')

// Create HTTP serviceWorker
http.createServer((request, response) =>{

    // Enable CORS
    response.setHeader('Access-Control-Allow-Origin', '*')

    // Get request vars
    const { url, method } = request


    // subscribe
    if (method === 'POST' && url.match(/^\/subscribe\/?/)) {

        // Get POST body
        let body = []

        // Read body stream
        request.on('data', chunk => body.push(chunk)).on('end', () => {
            response.end('Subscribe')
        })

    // Public key
} else if (url.match(/^\/key\/?/)) {
        // Respond with public key
        response.end('public key')

    // Push Notifications
    } else if (method === 'POST' && url.match(/^\/push\/?/)) {

        // Get POST body
        let body = []

        // Read body stream
        request.on('data', chunk => body.push(chunk)).on('end', () => {
            response.end('Push Sent')
        })

    // Not found
    } else {
        response.status = 404
        respone.end('Error: Unkown Request')
    }

// lissten for response
}).listen(3333, () => { console.log('Server Running')});
