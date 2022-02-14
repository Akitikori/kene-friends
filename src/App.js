import "./styles.css";

import { Routes, Route } from "react-router-dom";

import { Game, Test } from "./components";

export default function App() {
  // return <Game prefix="Family is" suffix="Forever" />;
  return (
    <Routes>
      <Route path="/" element={<Game prefix="FAMILY IS" suffix="FOREVER" />} />
      <Route path="/test" element={Test()} />
    </Routes>
  );
}

/*
      <audio>
        <source src="./audio/Godfather.m3u" autoPlay=true>
        </audio>
        */
