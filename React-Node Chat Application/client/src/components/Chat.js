// import React, { useEffect, useState } from "react";

// function Chat({ socket, username, room }) {
//   const [message, setMessage] = useState("");
//   const [messageList, setMessageList] = useState([]);

//   const onMessageSent = async () => {
//     if (message) {
//       const currentTime = new Date(Date.now());
//       const messageData = {
//         room: room,
//         user: username,
//         message: message,
//         time: currentTime.getHours() + ":" + currentTime.getMinutes(),
//       };
//       //   console.log(messageData);
//       await socket.emit("Send_Message", messageData);
//       setMessageList((list) => [...list, message]);
//     }
//   };

//   useEffect(() => {
//     socket.on("Receive_Message", (message) => {
//       console.log(message);
//       setMessageList((list) => [...list, message]);
//     });
//   }, [socket]);

//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         <p>Live Chat</p>
//       </div>
//       <div className="chat-body">
//         {messageList.map((messageData) => {
//           return <h1>{messageData.message}</h1>;
//         })}
//       </div>
//       <div className="chat-footer">
//         <input
//           type="text"
//           placeholder="Hey..."
//           onChange={(event) => setMessage(event.target.value)}
//         />
//         <button onClick={onMessageSent}>&#9658;</button>
//       </div>
//     </div>
//   );
// }

// export default Chat;

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
        // time:
        //   new Date(Date.now()).getHours() +
        //   ":" +
        //   new Date(Date.now()).getMinutes(),
        time: currentTime.getHours() + ":" + currentTime.getMinutes(),
      };

      await socket.emit("Send Message", messageData);
      setChatList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    // console.log("In useEffect");
    // socket.on("Receive_Message", (data) => {
    //   setMessageList((list) => [...list, data]);
    //   socket.removeListener("Receive_Message");
    // });
    // console.log(messageList);
    socket.off("Receive Message").on("Receive Message", (data) => {
      // console.log(data,'recive');
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
