run()

async function run() {
    const res = await Notification.requestPermission()
    if (res === "granted") {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register("/serviceworker.js")
                .then(registration => {
                    registration.showNotification('Hello!', {
                        body: 'This is a notification example.',
                        icon: 'icon.png' // Replace with your notification icon
                    });
                });
        }
    }
}