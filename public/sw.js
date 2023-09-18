/// <reference lib="webworker" />

let unsubscribeURL = "";

self.addEventListener("install", function(_) {
    self.skipWaiting();
});

self.addEventListener('push', async function(event) {
    console.log('Push message received.');

    if (!event.data) {
        console.log("No event data received");
        return;
    }

    const data = await event.data.json()
    data.actions ??= [];
    data.body ??= "No data sent by server";
    data.title ??= "No title sent by server"
    data.url ??= "https://4block.com.au/debug";
    unsubscribeURL = data.usuburl ?? "https://4block.com.au/unsubscribe";
    // Ensuring that there's always the option to unsubscribe, no matter what the server is sending.
    data.actions.push(
        {
            action: 'unsubscribe',
            type: 'button',
            title: '👎 Unsubscribe'
        }
    );

    const notificationOptions = {
        body: data.body,
        icon: '/images/4Block-512x512.png',
        badge: '/images/4Block-72x72.png',
        data: {
            url: data.url,
        },
        actions: data.actions
    };

    event.waitUntil(
        self.registration.showNotification(
            data.title,
            notificationOptions,
        ),
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification clicked.');
    
    let clickResponsePromise = Promise.resolve();
    
    switch (event.action) {
    case 'view-offer':
        console.log('Viewing offer')
        if (event.notification.data && event.notification.data.url) {
            clickResponsePromise = clients.openWindow(event.notification.data.url);
        }
        //event.notification.close();
        break;
    case 'unsubscribe':
        console.log('Unsubscribing');
        if (event.notification.data && event.notification.data.url) {
            clickResponsePromise = clients.openWindow(unsubscribeURL);
        }
        //event.notification.close();
        break;
    }


    event.waitUntil(clickResponsePromise);
});

self.addEventListener('activate', function(event) {
    event.waitUntil(clients.claim());
});
