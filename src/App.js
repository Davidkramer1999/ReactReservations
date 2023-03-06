import React from "react";
import { Routes, Route } from "react-router-dom";
import SelectCurrencies from "./Components/SelectCurrencies";
import Accommodations from "./Components/Accommodations";
import SelectedAccommodations from "./Components/SelectedAccommodations";
import NavigationBar from "./Components/NavigationBar";
const App = () => {

  return (
    <>
    <NavigationBar></NavigationBar>
      < Routes >
        <Route path="/" element={<SelectCurrencies />} />
        <Route path="/SelectCurrencies" element={<SelectCurrencies />} />
        <Route path="/Accommodations" element={<Accommodations />} />
        <Route path="/SelectedAccommodations" element={<SelectedAccommodations />} />
      </Routes>
    </>
  );
};

export default App;
