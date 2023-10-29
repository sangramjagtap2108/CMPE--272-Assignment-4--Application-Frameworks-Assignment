import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [student, setStudent] = useState("");
  const [studyGroup, setStudyGroup] = useState("");
  const [displayGroupChat, setDisplayGroupChat] = useState(false);

  const onJoinChat = () => {
    if (student && studyGroup) {
      socket.emit("Join Study Group", studyGroup);
      setDisplayGroupChat(true);
    }
  };

  return (
    <div className="Form">
      {!displayGroupChat ? (
        <div className="joinChatContainer">
          <h1>Kahoot!</h1>
          <input
            type="text"
            placeholder="Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
          <input
            type="text"
            placeholder="Enter PIN"
            onChange={(event) => setStudyGroup(event.target.value)}
            onKeyDown={(event) => {
              event.key === "Enter" && onJoinChat();
            }}
          />
          <button onClick={onJoinChat}>Join Study Group</button>
        </div>
      ) : (
        <Chat socket={socket} student={student} studyGroup={studyGroup} />
      )}
    </div>
  );
}

export default App;
