import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Auth from "pages/Auth";

function WebRouter({ isLoggedIn }) {
    return (
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <Route path="/" element={<Home />} />
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
}

export default WebRouter;
