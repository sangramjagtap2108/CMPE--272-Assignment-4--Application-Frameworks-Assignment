import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, student, studyGroup }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatList, setChatList] = useState([]);

  const onMessageSent = async () => {
    if (currentMessage !== "") {
      const currentTime = new Date(Date.now());
      const messageData = {
        group: studyGroup,
        student: student,
        message: currentMessage,
        time: currentTime.getHours() + ":" + currentTime.getMinutes(),
      };

      await socket.emit("Send Message", messageData);
      setChatList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.off("Receive Message").on("Receive Message", (data) => {
      setChatList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Group Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {chatList.map((messageContent) => {
            return (
              <div
                className="message"
                id={student === messageContent.student ? "you" : "other"}
                key={messageContent.student}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="student">{messageContent.student}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && onMessageSent();
          }}
        />
        <button onClick={onMessageSent}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
