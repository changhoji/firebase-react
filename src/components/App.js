import { useState, useEffect } from "react";
import WebRouter from "components/WebRouter";
import { authService } from "firebaseApp";

function App() {
    //user 또는 null로 initial stsate 설정
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? (
                <WebRouter isLoggedIn={isLoggedIn} userObj={userObj} />
            ) : (
                "Initializing..."
            )}
            <footer>&copy; {new Date().getFullYear()} changhoji</footer>
        </>
    );
}

export default App;
