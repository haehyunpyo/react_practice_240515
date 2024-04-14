import React from "react";
import { Route, Routes } from "react-router-dom";
import TestSignup from "./pages/TestSignup";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TestSignup />} />
      </Routes>
    </div>
  );
}

export default App;
