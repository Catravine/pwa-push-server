// Push Module
const webpush = require('web-push')
const urlsafeBase64 = require('urlsafe-base64')
const Storage = require('node-storage')

// Vapid keys
const vapid = require('./vapid.json')

// Configure web-Push
webpush.setVapidDetails(
    'mailto:caroline@carolinecourtney.com',
    vapid.publicKey,
    vapid.privateKey
)

// subscriptions
const store = new Storage(`${__dirname}/db`)
let subscriptions = store.get('subscriptions') || []
console.log(subscriptions)

// Create URL save vapid public keys
module.exports.getKey = () => urlsafeBase64.decode(vapid.publicKey)


// Store a new getSubscription
module.exports.addSubscription = (subscription) => {

    // Add to subscriptions array
    subscriptions.push(subscription)

    // Persist subscriptions
    store.put('subscriptions', subscriptions)
}

// Send notivications to all registerd subscriptioins
module.exports.send = (message) => {

    // Loop subscriptioins
    subscriptions.forEach((subscription, i) => {

        // Send Notification
        webpush.sendNotifications(subscription, message)
            .catch(status => {
                console.log(status.statusCode)
            })
    })
}
