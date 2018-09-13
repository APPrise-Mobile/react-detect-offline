import React, { Component } from "react";
import { Offline, Online, Detector } from "./Component";
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
              "https://riffraff-beta.indiciummobile.com/account/subdomain/josh-beta"
            ]
          }}
        >
          Online Component
        </Online>
        <Offline
          polling={{
            enabled: true,
            urls: [
              "https://riffraff-beta.indiciummobile.com/account/subdomain/josh-beta"
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
