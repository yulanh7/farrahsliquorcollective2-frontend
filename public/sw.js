/// <reference lib="webworker" />

let unsubscribeURL = "";
let viewOfferURL = "";
let messageId = "";

self.addEventListener("install", function (_) {
  self.skipWaiting();
});

self.addEventListener("push", async function (event) {
  console.log("Push message received.");

  if (!event.data) {
    console.log("No event data received");
    return;
  }

  const data = await event.data.json();
  data.actions ??= [];
  data.body ??= "No data sent by server";
  data.title ??= "No title sent by server";
  messageId =
    data.messageId ??= "https://4block.com.au/debug";
  unsubscribeURL =
    data.usuburl ?? "https://dev.farrahsliquorcollective2.com/opt-out";
  viewOfferURL = "https://dev.farrahsliquorcollective2.com/detail";
  // Ensuring that there's always the option to unsubscribe, no matter what the server is sending.
  if (data.title && data.title == "Message From a Client") {
    data.actions.push(
      {
        action: "reply-client",
        type: "button",
        title: "💬 Reply",
      },
    );
  } else if (data.title && data.title == "Message From a Admin") {
    data.actions.push(
      {
        action: "reply-admin",
        type: "button",
        title: "💬 Reply",
      },
    );
  } else {

    data.actions.push(
      {
        action: 'view-offer',
        type: 'button',
        title: '👀 Opt In'
      },
      {
        action: "unsubscribe",
        type: "button",
        title: "👎 Unsubscribe",
      },
    );
  }

  const notificationOptions = {
    body: data.body,
    // icon: "/images/4Block-512x512.png",
    badge: "/images/4Block-72x72.png",
    data: {
      url: data.url,
    },
    requireInteraction: true,
    actions: data.actions,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, notificationOptions)
  );
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification clicked.");

  let clickResponsePromise = Promise.resolve();
  const channel = new BroadcastChannel("feedback-channel");

  switch (event.action) {
    case "view-offer":
      console.log("Viewing offer");
      if (event.notification.data && event.notification.data.url) {
        clickResponsePromise = clients.openWindow(viewOfferURL);
      }
      //event.notification.close();
      break;
    case "unsubscribe":
      console.log("Unsubscribing");
      if (event.notification.data && event.notification.data.url) {
        clickResponsePromise = clients.openWindow(unsubscribeURL);
      }
      //event.notification.close();
      break;
    case "reply-client":
      // Send a message to the client
      channel.postMessage({ action: "show-reply-client-modal", messageId: messageId });
      // Close the channel
      channel.close();
      break;
    case "reply-admin":
      // Send a message to the client
      channel.postMessage({ action: "show-reply-admin-modal", messageId: messageId });
      // Close the channel
      channel.close();
      break;

  }

  event.waitUntil(clickResponsePromise);
});

self.addEventListener("activate", function (event) {
  event.waitUntil(clients.claim());
});

self.addEventListener("pushsubscriptionchange", function (event) {
  event.waitUntil(
    fetch(
      "https://dev.farrahsliquorcollective2.com:3101/user/pushsubscriptionchange",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          old_endpoint: event.oldSubscription
            ? event.oldSubscription.endpoint
            : null,
          new_endpoint: event.newSubscription
            ? event.newSubscription.endpoint
            : null,
          new_p256dh: event.newSubscription
            ? event.newSubscription.toJSON().keys.p256dh
            : null,
          new_auth: event.newSubscription
            ? event.newSubscription.toJSON().keys.auth
            : null,
        }),
      }
    )
  );
});
