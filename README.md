# User Tracking Library

A lightweight JavaScript library for tracking user interactions on websites. This library captures various user events including clicks, inputs, keypresses, and scrolls, storing them for later analysis.

## Features

- Tracks multiple user interactions:
  - Clicks
  - Input changes
  - Key presses
  - Scroll events
- Persistent storage using localStorage
- Simple API for controlling tracking
- Detailed event information including timestamps and element details

## Installation

1. Clone this repository or download the `user-tracking.js` file
2. Include the script in your HTML file:

```html
<script src="path/to/user-tracking.js"></script>
```

## Usage

### Basic Implementation

```html
<script src="user-tracking.js"></script>
<script>
  // Start tracking user interactions
  UserTracker.getInstance().startTracking();
</script>
```

### API Methods

```javascript
// Start tracking
UserTracker.getInstance().startTracking();

// Stop tracking
UserTracker.getInstance().stopTracking();

// Get all recorded events
const events = UserTracker.getInstance().getEvents();

// Clear all recorded events
UserTracker.getInstance().clearEvents();
```

### Event Data Structure

Each recorded event contains the following information:

```javascript
{
    eventType: string,    // Type of event (click, input, keydown, scroll)
    element: string,      // CSS selector of the target element
    value: string,        // Value for input events (optional)
    url: string,         // URL where the event occurred
    timestamp: number    // Unix timestamp of the event
}
```

## Demo

A demo page is included in the repository. To view it:

1. Clone the repository
2. Open `public/index.html` in a web browser
3. Interact with the demo elements to see the tracking in action
4. Use the control buttons to start/stop tracking and view recorded events

## Browser Support

The library is compatible with all modern browsers that support:

- ES6+
- localStorage
- Event delegation

## License

MIT License - feel free to use this library in your projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
