import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Lobby from "./screens/Lobby/Lobby";
import "./index.css";
import GameProvider from "./context/GameContext";
import Router from "./screens/Router/Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GameProvider>
      <Router />
    </GameProvider>
  </React.StrictMode>
);

reportWebVitals();
