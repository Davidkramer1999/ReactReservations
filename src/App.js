import React from "react";
import { Routes, Route } from "react-router-dom";
import Dropdown from "./Components/Dropdown";
import Accommodations from "./Components/Accommodations";
import ShowAll from "./Components/ShowAll";
const App = () => {

  return (
    <>
      < Routes >
        <Route path="/" element={<Dropdown />} />
        <Route path="/dropdown" element={<Dropdown />} />
        <Route path="/Accommodations" element={<Accommodations />} />
        <Route path="/ShowAll" element={<ShowAll />} />
      </Routes>
    </>
  );
};

export default App;
