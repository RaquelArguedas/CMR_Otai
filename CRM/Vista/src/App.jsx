import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
export function App() {
    return (
    <Router>
        <div className="App">
            <Navbar />
            <Routes>
            {/*<Route exact path= "/" element = {<Login/>} />
            <Route exact path= "/recuperar" element = {<Recuperar/>} /> */}
            </Routes>
        </div>
    </Router>
    )
    
}