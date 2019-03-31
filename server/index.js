//  Modules
const http = require('http')
const push = require('./push')

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

            // Parse subscription body to object
            let subscription = JSON.parse(body.toString())

            // Store subscription for push Notifications
            push.addSubscription(subscription)

            // Respond
            response.end('Subscribed')
        })

    // Public key
    } else if (url.match(/^\/key\/?/)) {

        // Respond with public key from push module
        response.end(push.getKey())

    // Push Notifications
    } else if (method === 'POST' && url.match(/^\/push\/?/)) {

        // Get POST body
        let body = []

        // Read body stream
        request.on('data', chunk => body.push(chunk)).on('end', () => {

            // Send Notifications ith POST body
            push.send(body.toString())

            // Respond
            response.end('Push Sent')
        })

    // Not found
    } else {
        response.status = 404
        respone.end('Error: Unkown Request')
    }

// listen for response
}).listen(3333, () => { console.log('Server Running')});
