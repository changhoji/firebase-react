import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Auth from "pages/Auth";
import Profile from "pages/Profile";
import Navigation from "components/Navigation";

function WebRouter({ isLoggedIn, userObj }) {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Home userObj={userObj} />} />
                    </>
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
}

export default WebRouter;
