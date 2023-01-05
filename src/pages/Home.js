import React, { useState, useEffect } from "react";
import Tweet from "components/Tweet";
import { dbService } from "firebaseApp";
import {
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";

function Home({ userObj }) {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        onSnapshot(
            query(
                collection(dbService, "tweets"),
                orderBy("createdAt", "desc")
            ),
            (snapshot) => {
                const dbTweets = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTweets(dbTweets);
            }
        );
    }, []);

    async function onSubmit(e) {
        const newTweet = tweet;
        setTweet("");
        e.preventDefault();
        await addDoc(collection(dbService, "tweets"), {
            text: newTweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
        });
    }

    function onChange(e) {
        const {
            target: { value },
        } = e;
        setTweet(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={100}
                    value={tweet}
                    onChange={onChange}
                />
                <input type="submit" value="tweet" />
            </form>
            <div>
                {tweets.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
