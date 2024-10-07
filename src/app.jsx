import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from "./Blog";
import Add from "./add";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/add-movie" element={<Add />} />
      </Routes>
    </Router>
  );
};

export default App;
