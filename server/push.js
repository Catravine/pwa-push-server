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

    // Notification promises
    let notificatioins = []

    // Loop subscriptions
    subscriptions.forEach((subscription, i) => {

        // Send Notification
        let p = webpush.sendNotifications(subscription, message)
            .catch(status => {

                // Check for "410 - Gone" status
                if (status.statusCode === 410) subscriptions[i]['delete'] = true

                // Return any value
                return null
            })

        // Push notification promise to array
        notifications.push(p)
    })

    // Clean subscriptioins marked for deletion
    Promise.all(notifications).then(() => {

        // Filter subscriptioins
        subscrptions = subscriptions.filter(subscription =>  !subscription.delete)

        // Persist cleaned array
        store.put('subscriptions', subscriptions)
    })
}
