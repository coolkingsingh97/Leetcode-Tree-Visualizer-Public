import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
// import ArrayList from "./components/arrays-list.component";
// import EditArray from "./components/edit-array.component";
import CreateArray from "./components/create-array.component";
// import CreateIP from "./components/create-IP.component";

function App() {
 return (
   <Router>
    <div className='container'>
      <Navbar />
      <br/>
      <Routes>
        <Route path="/" element={<CreateArray/>} /> 
        {/* <Route path="/edit/:id" element={<EditArray/>} /> */}
        {/* <Route path="/create" element={<CreateArray/>} /> */}
        {/* <Route path="/ip" element={<CreateIP/>} /> */}
      </Routes>
      </div>
   </Router>
 );
}

export default App;

