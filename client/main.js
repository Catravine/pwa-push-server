// Service Worker registration
let swReg

// Push Server url
const serverUrl = 'http://localhost:3333'

// Update UI for subscribed status
const setSubscribedStatus = (state) => {
    if (state) {
        document.getElementById('subscribe').className = "hidden";
        document.getElementById('unsubscribe').className = "";
    } else {
            document.getElementById('subscribe').className = "";
            document.getElementById('unsubscribe').className = "hidden";
    }
}


// Register Service Wroker
navigator.serviceWorker.register('sw.js').then(registration => {
    // referecne registration globally
    swReg = registration

    // Check if a subscription exists and if so, update the UI
    swReg.pushManager.getSubscription().then(setSubscribedStatus)

    // log errors
}).catch(console.error);


// Get public keey from Server
const getApplicationServerKey = () => {
    return fetch (`${serverUrl}/key`)

        // Parse response boy as arrayBuffer
        .then(res => res.arrayBuffer())

        // return arrayBuffer as new Uint8Array
        .then(key => new Uint8Array(key))
}

// Subscribe for push Notifications
const subscribe = () => {

    // Get applicationServerKey from push swerver
    getApplicationServerKey().then(key => {
        // swReg.pushManager.subscribe({userVisibleOnly: true, applicationServerKey: publicKey})
    })

    // Check registration is availble
    if (!swReg) return console.error("Service Worker registration not found");

}
