# User Tracking Library

A lightweight JavaScript library for tracking user interactions on websites. This library captures various user events including clicks, inputs, keypresses, and scrolls, storing them for later analysis.

## Features

- Tracks multiple user interactions:
  - Clicks
  - Input changes
  - Key presses
  - Scroll events (debounced)
- Persistent storage using localStorage
- Simple API for controlling tracking
- Detailed event information including timestamps and element details
- React demo application included

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Development

To run the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

## Usage

### Basic Implementation

```html
<script type="module" src="/js/user-tracking.js"></script>
```

The library automatically initializes and starts tracking when loaded. You can access the tracker through the global `window.UserTracker` object.

### API Methods

```javascript
// Start tracking
window.UserTracker.startTracking();

// Stop tracking
window.UserTracker.stopTracking();

// Get all recorded events
const events = window.UserTracker.getEvents();

// Clear all recorded events
window.UserTracker.clearEvents();
```

### Event Data Structure

Each recorded event contains the following information:

```javascript
{
    eventType: string,    // Type of event (click, input, keydown, scroll)
    element: string,      // CSS selector of the target element (includes tag name, id, and classes)
    value: string|null,   // Value for input events (null for non-input events)
    url: string,         // URL where the event occurred
    timestamp: number    // Unix timestamp of the event
}
```
