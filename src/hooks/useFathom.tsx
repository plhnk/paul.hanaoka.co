"use client";

import * as Fathom from "fathom-client";

export function useFathomEvent() {
  const trackEvent = (eventName: string) => {
    if (process.env.NODE_ENV === "production") {
      Fathom.trackEvent(eventName);
    }
  };

  return { trackEvent };
}