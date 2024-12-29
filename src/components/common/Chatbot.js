// import React, { useState } from "react";
// import { Widget, addResponseMessage } from "react-chat-widget";
// import "react-chat-widget/lib/styles.css";


// function Chatbot() {
//     const [isOpen, setIsOpen] = useState(false); // Track whether the chatbot is open

//     const handleNewUserMessage = async (newMessage) => {
//         try {
//             const response = await fetch("http://localhost:8080/api/chatbot/respond", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ query: newMessage }),
//             });
//             const data = await response.json();
//             addResponseMessage(data.reply); // Display bot's reply
//         } catch (error) {
//             console.error("Error fetching from the backend:", error);
//             addResponseMessage("Sorry, I encountered an error. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <button style={{ position: "fixed", bottom: 4, right: 80, width: 90, height: 40 }} onClick={() => setIsOpen((prev) => !prev)} title="Chat with us">
//                 {isOpen ? "Close " : "Chat "}
//             </button>
//             {isOpen && (
//                 <div style={{ bottom: 80, right: 10 }}>
//                     <Widget
//                         handleNewUserMessage={handleNewUserMessage}
//                         title="Chat with us"
//                         subtitle="How can I help you?"
//                     />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Chatbot;


import React, { useState } from 'react';
import "./Chatbot.css";
function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! How can I assist you today? Please select an option below.' },
    ]);
    const questionsAndAnswers = [
        { question: 'How can I schedule an appointment?', answer: 'You can schedule an appointment through the Appointments section on the website or mobile app. Select a doctor and choose an available time slot.' },
        { question: 'Can you tell me the status of my appointment?', answer: 'To check the status of your appointment, please visit the Appointments page in your account.' },
        { question: 'How do I book an appointment?', answer: 'Log in to your account, select a doctor, and book an available slot.' },
        { question: 'How do I reset my password?', answer: 'Click on the "Forgot Password" link on the login page and follow the instructions.' },
    ];
    const toggleChatbot = () => setIsOpen(!isOpen);
    const handleQuestionClick = (qa) => {
        setMessages((prev) => [
            ...prev,
            { sender: 'user', text: qa.question },
            { sender: 'bot', text: qa.answer },
        ]);
    };
    return (
        <>
            {/* Chatbot Trigger */}
            <div className="chatbot-trigger">
                <button className="open-chatbot-btn" onClick={toggleChatbot}>
                    <i className="fas fa-comments"></i>
                    <span className="chatbot-btn-text">Chat</span>
                </button>
            </div>

            {/* Chatbot Container */}
            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        Chat with Us
                        <span onClick={toggleChatbot}>X</span>
                    </div>
                    <div className="chatbot-body">
                        {messages.map((msg, i) => (
                            <div key={i} className={`chatbot-message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chatbot-footer">
                        {questionsAndAnswers.map((qa, i) => (
                            <button key={i} className="chatbot-question-btn" onClick={() => handleQuestionClick(qa)}>
                                {qa.question}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
export default Chatbot;