import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import FlashcardViewer from './components/FlashcardViewer';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';


function App() {
  return (
    <Router>
      <div className="App">
        <Header /><br/>
        <Routes>
          
          <Route path="/"  element={<FlashcardViewer/>} />

          
          <Route path="/admin" element={<AdminDashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;