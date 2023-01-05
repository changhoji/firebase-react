import { authService } from "firebaseApp";
import { useNavigate } from "react-router-dom";
import React from "react";

function Profile() {
    const navigate = useNavigate();

    function onLogOut() {
        authService.signOut();
        navigate("/");
    }
    return (
        <div>
            <button onClick={onLogOut}>Log Out</button>
        </div>
    );
}

export default Profile;
