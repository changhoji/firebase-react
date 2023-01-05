import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "firebaseApp";
import React, { useState } from "react";

function Tweet({ tweetObj, isOwner }) {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    function onDeleteClick(e) {
        const ok = window.confirm(
            "Are you sure you want to delete this tweet?"
        );
        if (ok) {
            //delete tweet!
            const tweetData = doc(dbService, `tweets/${tweetObj.id}`);
            deleteDoc(tweetData);
        }
    }

    function toggleEditing() {
        setEditing((prev) => !prev);
    }

    function onChange(e) {
        const {
            target: { value },
        } = e;
        setNewTweet(value);
    }

    function onSubmit(e) {
        e.preventDefault();
        const tweetData = doc(dbService, `tweets/${tweetObj.id}`);
        updateDoc(tweetData, { text: newTweet });
        setEditing(false);
    }

    return (
        <div>
            {editing ? (
                <form onSubmit={onSubmit}>
                    <input value={newTweet} onChange={onChange} required />
                    <input type="submit" value="Update Tweet" />
                </form>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>
                                Delete Tweet
                            </button>
                            <button onClick={toggleEditing}>Edit Tweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Tweet;
