import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import { Login, SignUp, Dashboard } from "./pages";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
