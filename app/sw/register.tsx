"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "SERCHENO SERVICE WORKER REGISTERED:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error(
            "SERCHENO SERVICE WORKER ERROR:",
            error
          );
        });
    }
  }, []);

  return null;
}
