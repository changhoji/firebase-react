import { useState } from "react";
import WebRouter from "components/WebRouter";
import { authService } from "firebaseApp";

function App() {
    console.log(authService.currentUser);

    //user 또는 null로 initial stsate 설정
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    return <WebRouter isLoggedIn={isLoggedIn} />;
}

export default App;
