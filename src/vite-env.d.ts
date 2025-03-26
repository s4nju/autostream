/// <reference types="vite/client" />

interface UserTracker {
  getEvents(): Array<{
    eventType: string;
    element: string;
    value: string | null;
    url: string;
    timestamp: number;
  }>;
  startTracking(): void;
  stopTracking(): void;
  clearEvents(): void;
}

interface Window {
  UserTracker: UserTracker;
}
