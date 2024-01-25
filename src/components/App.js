import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Home from './Home';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Signin />} />
          {/* <Route path="/login" element={<Login />} /> */}

          <Route path="/home" element={<Home />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;