import { useState, useEffect } from "react";
import WebRouter from "components/WebRouter";
import { authService } from "firebaseApp";

function App() {
    //user 또는 null로 initial stsate 설정
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? <WebRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
            <footer>&copy; {new Date().getFullYear()} changhoji</footer>
        </>
    );
}

export default App;
