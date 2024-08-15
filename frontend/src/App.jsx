import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import './App.css';
import ImagePage from './Components/ImageForm';
import Signup from './Components/Signup';
import Otpverify from './Components/Otpverify';
import Header from './Components/Header';
import HomePage from "./Components/Home";
import ChatPage from './Components/Chat';
import ChatModule from './Components/ChatModule';
import AdminPanel from './Components/AdminPanel'; // Assuming correct file name
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const userId = localStorage.getItem("userid");

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login socket={socket} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/twoStepverify" element={<Otpverify />} />
          <Route path="/createpost" element={<ImagePage />} />
          <Route path="/home" element={<HomePage socket={socket} />} />
          <Route path="/adminpanal" element={<AdminPanel />} /> {/* Fixed component name */}
          
          {/* Uncomment this route if you want to use it */}
          {/* <Route path="/chat" element={<ChatModule userId={userId} socket={socket} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
