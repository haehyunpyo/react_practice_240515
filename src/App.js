import React from "react";
import { Route, Routes } from "react-router-dom";
import TestSignup from "./pages/TestSignup";
import TestListRef from "./pages/TestListRef";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<TestSignup />} />
        <Route path="/" element={<TestListRef />} />
      </Routes>
    </div>
  );
}

export default App;
