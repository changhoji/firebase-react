import React, { useState } from "react";
import { authService } from "firebaseApp";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    function onChange(e) {
        const {
            target: { name, value },
        } = e;
        if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    }
    async function onSubmit(e) {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                //create account
                data = await createUserWithEmailAndPassword(
                    authService,
                    email,
                    password
                );
            } else {
                //do login
                data = await signInWithEmailAndPassword(
                    authService,
                    email,
                    password
                );
            }
            console.log(data);
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    }

    function toggleAccount() {
        setNewAccount((prev) => !prev);
    }

    async function onSocialClick(e) {
        const {
            target: { name },
        } = e;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        }
        console.log(await signInWithPopup(authService, provider));
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    value={email}
                    onChange={onChange}
                    placeholder="Email"
                    required
                />
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    required
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"}
                />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Login" : "Create Account"}
            </span>
            <div>
                <button name="google" onClick={onSocialClick}>
                    Continue with Google
                </button>
            </div>
        </div>
    );
}

export default Auth;
