import React, { useState } from 'react';
import axios from 'axios';
import './ChatBot.css'; // Make sure this path and file name are correct

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const toggleChat = () => setShowChat(!showChat);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to the chat
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      // Send user input to backend
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: userInput,
      });

      const botReply = response.data.reply;
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botReply }]);
    } catch (error) {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'bot', text: 'Error: Could not reach the server.' },
      ]);
    }
  };

  return (
    <>
      <div className="chatbot-button" onClick={toggleChat}>💬</div>

      {showChat && (
        <div className="chatbox">
          <div className="chat-header">🛒 CLICK SMART SHOPPING AI BOT</div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
