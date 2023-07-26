// sw.js
self.addEventListener("install", async () => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", async () => {
  console.log("Service Worker activated");
});

self.addEventListener("push", function (event) {
  const title = "Simple Title";

  const options = {
    body: "Simple piece of body text.\nSecond line of body text :)",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  var notification = event.notification;
  var action = event.action;

  if (action === "close") {
    notification.close();
  } else {
    clients.openWindow("https://www.google.com");
    notification.close();
  }
});
