import { useState, useEffect } from "react";
import "./App.css";

interface TrackingEvent {
  eventType: string;
  element: string;
  value: string;
  url: string;
  timestamp: string;
}

function App() {
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);

  useEffect(() => {
    const updateEvents = () => {
      const eventsStr = localStorage.getItem("user_tracking_events");
      if (eventsStr) {
        try {
          const events = JSON.parse(eventsStr);
          setTrackingEvents(events);
        } catch (error) {
          console.error("Error parsing tracking events:", error);
        }
      }
    };

    // Initial load
    updateEvents();

    // Set up polling interval
    const intervalId = setInterval(updateEvents, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="tracking-events">
      <h2>User Tracking Events</h2>
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
                <p>
                  <strong>Element:</strong> {event.element}
                </p>
                <p>
                  <strong>Value:</strong> {event.value}
                </p>
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
