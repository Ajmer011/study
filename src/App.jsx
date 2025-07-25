// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './Components/LandingPage';  // Import LandingPage component
import LoginPage from './Components/LoginPage';
import RegistrationPage from './Components/RegistrationPage';
import HomePage from './Components/HomePage';

import PlanningPage from './Components/PlanningPage';
import NotewithFlashcard from './Components/NotewithFlashcard';
import ProgressPage from './Components/ProgressPage';
import RivisionPage from './Components/RivisionPage';
import Prodotimer from './Components/Prodotimer';
import ProfilePage from './Components/ProfilePage';
import Profileedit from './Components/Profileedit';


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for LandingPage */}
         <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
       
       
        <Route path="/trial" element={<HomePage />} />
       
         <Route path="/planning" element={<PlanningPage />} />
         
        
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/notes" element={<NotewithFlashcard />} />
           <Route path="/progress" element={<ProgressPage />} />
           <Route path="/rivision" element={<RivisionPage />} />
            <Route path="/signup" element={<RegistrationPage />} />
            <Route path="/timer" element={<Prodotimer />} />
             <Route path="/profile" element={<ProfilePage/>} />
              <Route path="/profileedit" element={<Profileedit/>} />
      </Routes>
    </Router>
  );
}

export default App;
