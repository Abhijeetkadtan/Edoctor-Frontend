import React, { useState } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";


function Chatbot() {
    const [isOpen, setIsOpen] = useState(false); // Track whether the chatbot is open

    const handleNewUserMessage = async (newMessage) => {
        try {
            const response = await fetch("http://localhost:8080/api/chatbot/respond", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: newMessage }),
            });
            const data = await response.json();
            addResponseMessage(data.reply); // Display bot's reply
        } catch (error) {
            console.error("Error fetching from the backend:", error);
            addResponseMessage("Sorry, I encountered an error. Please try again.");
        }
    };

    return (
        <div>
            <button style={{ position: "fixed", bottom: 4, right: 80, width: 90, height: 40 }} onClick={() => setIsOpen((prev) => !prev)} title="Chat with us">
                {isOpen ? "Close Chat" : "Chat with us"}
            </button>
            {isOpen && (
                <div style={{ bottom: 80, right: 10 }}>
                    <Widget
                        handleNewUserMessage={handleNewUserMessage}
                        title="Chat with us"
                        subtitle="How can I help you?"
                    />
                </div>
            )}
        </div>
    );
}

export default Chatbot;
