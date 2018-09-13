import React, { Component } from "react";
import { Offline, Online, Detector } from "./components";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Detector
          render={({ online }) => (
            <div className={`App ${online ? "Online" : "Offline"}`}>
              detector: {online ? "online" : "offline"}
            </div>
          )}
        />
        <Online
          polling={{
            enabled: true,
            urls: [
              "https://heartbeat1.indiciummobile.com",
              "https://heartbeat2.indiciummobile.com",
              "https://heartbeat3.indiciummobile.com"
            ]
          }}
        >
          Online Component
        </Online>
        <Offline
          polling={{
            enabled: true,
            urls: [
              "https://heartbeat1.indiciummobile.com",
              "https://heartbeat2.indiciummobile.com",
              "https://heartbeat3.indiciummobile.com"
            ]
          }}
        
        >
          Offline Component with custom polling
        </Offline>
      </div>
    );
  }
}

export default App;
