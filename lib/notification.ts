// lib/notification.ts
const publicVapidKey =
  "BKfDNGGIR1fHDzSosBgBWnjTGGHisGBRNe04vN3ivLOkpnyHnol0OLmg27KizStyxKVyEqI-D6rBOQVu-lB49jA"; // Replace this with your actual public Vapid key

export async function run() {
  try {
    console.log("Registering service worker...");
    let registration;

    if ("serviceWorker" in navigator) {
      registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered...");
    } else {
      console.error("Service Worker API is not supported in this browser.");
      return;
    }

    console.log("Registering push notification...");
    // try {
    //   const permission = await Notification.requestPermission();

    //   if (permission !== "granted") {
    //     throw new Error("Permission not granted for Notification");
    //   }
    // } catch (error) {
    //   console.error("User did not grant notification permission.", error);
    // }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return "notGranted";
    }
    // This will pop out the browser's native permission prompt
    let subscription = await registration.pushManager.getSubscription();

    // If the subscription does not exist, create a new one
    if (!subscription) {
      console.log("Creating new subscription...");
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });
    }

    return subscription;

    // const currentId = "user_id_here"; // Replace with the actual user ID
    // const host = window.location.host.replace(/:[0-9]{1,5}.*/, "");

    // console.log("currentId before push notification to server", currentId);
    // Send Push Notification to server
    // try {
    //   const response = await fetch(
    //     `http://${host}:3008/user/${currentId}/subscribe`,
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(subscription),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   const data = await response.json();
    //   console.log("User updated:", data);
    // } catch (error) {
    //   console.error("Error updating user:", error);
    // }
  } catch (error) {
    console.error("Error during push notification setup:", error);
    return null;
  }
}

// Helper function to convert a VAPID public key to a Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
