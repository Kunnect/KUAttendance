// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserPage from './Userpage';
import Dobby from './Dobby';
import Report from './Report';
import Working from './Working';
import './styles.css';

const App = () => {
  return (
    <Router>
      <div>
        
          
            <div className="nav">
              <Link to="/userpage">마이페이지</Link>
            </div>
            <div className="nav">
              <Link to="/dobby">커뮤니티</Link>
            </div>
            <div className="nav">
              <Link to="/report">보고서</Link>
            </div>
            <div className="nav">
              <Link to="/working">근로</Link>
            </div>
       
     

        <Routes>
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/dobby" element={<Dobby />} />
          <Route path="/report" element={<Report />} />
          <Route path="/working" element={<Working />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
