import { useState, useEffect } from "react";
import "./App.css";

interface TrackingEvent {
  eventType: string;
  element: string;
  value: string | null;
  url: string;
  timestamp: number;
}

function App() {
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [isTracking, setIsTracking] = useState(true);

  useEffect(() => {
    const updateEvents = () => {
      const events = localStorage.getItem("user_tracking_events");
      if (events) {
        setTrackingEvents(JSON.parse(events));
      }
    };

    // Initial load
    updateEvents();

    // Set up polling interval
    const intervalId = setInterval(updateEvents, 200);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleStartTracking = () => {
    window.UserTracker.startTracking();
    setIsTracking(true);
  };

  const handleStopTracking = () => {
    window.UserTracker.stopTracking();
    setIsTracking(false);
  };

  const handleClearEvents = () => {
    window.UserTracker.clearEvents();
  };

  return (
    <div className="tracking-events">
      <div className="header-container">
        <h2>User Tracking Events</h2>
        <div className="tracking-controls">
          <button
            onClick={handleStartTracking}
            disabled={isTracking}
            className="control-button start"
          >
            Start Tracking
          </button>
          <button
            onClick={handleStopTracking}
            disabled={!isTracking}
            className="control-button stop"
          >
            Stop Tracking
          </button>
          <button onClick={handleClearEvents} className="control-button clear">
            Clear Events
          </button>
        </div>
      </div>
      {trackingEvents.length === 0 ? (
        <p>No tracking events found</p>
      ) : (
        <div className="events-list">
          {trackingEvents.map((event, index) => (
            <div key={event.timestamp + index} className="event-card">
              <div className="event-header">
                <span className="event-type">{event.eventType}</span>
                <span className="event-time">
                  {new Date(event.timestamp).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="event-details">
                {event.eventType !== "scroll" && (
                  <p>
                    <strong>Element:</strong> {event.element}
                  </p>
                )}
                {event.eventType === "input" && (
                  <p>
                    <strong>Value:</strong> {event.value}
                  </p>
                )}
                <p>
                  <strong>URL:</strong> {event.url}
                </p>
              </div>
              <pre className="event-data">{JSON.stringify(event, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
