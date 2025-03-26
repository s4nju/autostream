export class UserTracker {
  static instance = null;
  events = [];
  isTracking = false;
  STORAGE_KEY = "user_tracking_events";

  constructor() {
    document.addEventListener("click", (event) =>
      this.handleEvent(event, "click")
    );
    document.addEventListener("input", (event) =>
      this.handleEvent(event, "input")
    );
    document.addEventListener("keydown", (event) =>
      this.handleEvent(event, "keydown")
    );
    document.addEventListener("scroll", (event) =>
      this.handleEvent(event, "scroll")
    );

    // Load existing events from localStorage
    this.loadEvents();

    this.startTracking();
  }

  static getInstance() {
    if (!UserTracker.instance) {
      UserTracker.instance = new UserTracker();
    }
    return UserTracker.instance;
  }

  loadEvents() {
    const storedEvents = localStorage.getItem(this.STORAGE_KEY);
    if (storedEvents) {
      this.events = JSON.parse(storedEvents);
    }
  }

  saveEvents() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events));
  }

  createEvent(eventType, element, value) {
    console.log(eventType, element, value);

    return {
      eventType,
      element:
        element.tagName +
        (element.id ? `#${element.id}` : "") +
        (element.className ? `.${element.className.split(" ").join(".")}` : ""),
      value: value || null,
      url: window.location.href,
      timestamp: Date.now(),
    };
  }

  handleEvent(event, eventType) {
    console.log(event, eventType);

    const target = event.target;
    this.events.push(this.createEvent(eventType, target, target?.value));
    this.saveEvents();
  }

  startTracking() {
    this.isTracking = true;
  }

  stopTracking() {
    if (!this.isTracking) return;

    document.removeEventListener("click", () =>
      this.handleEvent(event, "click")
    );
    document.removeEventListener("input", () =>
      this.handleEvent(event, "input")
    );
    document.removeEventListener("keydown", () =>
      this.handleEvent(event, "keydown")
    );
    document.removeEventListener("scroll", () =>
      this.handleEvent(event, "scroll")
    );

    this.isTracking = false;
    // console.log("User tracking stopped");
  }

  getEvents() {
    return this.events;
  }

  clearEvents() {
    this.events = [];
    localStorage.removeItem(this.STORAGE_KEY);
    console.log("User tracking events cleared");
  }
}

// Create global instance
window.UserTracker = new UserTracker();

window.UserTracker.startTracking();
