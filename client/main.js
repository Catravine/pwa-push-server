// Service Worker registration
let swReg

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

fetch('http://localhost:3333/key').then(res => res.text()).then(console.log)
