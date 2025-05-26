import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import UserList from '../components/UserList';
import ChatWindow from '../components/ChatWindow';
import useAuth from '../contexts/authProvider';
import { useNavigate } from 'react-router-dom';
import NoUserSelected from '../components/NoUserSelected';

// Use VITE_SERVER_URL from .env
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
console.log('SERVER_URL: ', SERVER_URL)
const socket = io(SERVER_URL, {
  transports: ['websocket'],
  extraHeaders: {
    'ngrok-skip-browser-warning': '69420'
  }

});

function ChatScreen() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users
  const fetchUsers = useCallback(() => {
    axios.get(`${SERVER_URL}/api/users`, {
      headers: {
        'ngrok-skip-browser-warning': '69420'
      }
    })
      .then(res => {
        console.log('User Response: ', res.data);
        const filtered = user
          ? res.data.filter(u => u._id !== user._id)
          : res.data;
        setUsers(filtered);
      })
      .catch(err => {
        console.log('User Response Error: ', err);
        console.error('Error fetching users:', err);
      });
  }, [user]);

  if (!isLoggedIn || !user) {
    navigate('/login');
  }

  // Register user with socket on login
  useEffect(() => {
    if (user && user._id) {
      socket.emit('register-user', user._id);
    }
  }, [user]);

  // Fetch users on mount and when user changes
  useEffect(() => {
    if (user) fetchUsers();
  }, [user, fetchUsers]);

  // Listen for real-time user list updates
  useEffect(() => {
    socket.on('user-list-updated', fetchUsers);
    return () => socket.off('user-list-updated', fetchUsers);
  }, [fetchUsers]);

  // Fetch chat history when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      axios.get(`${SERVER_URL}/api/messages/${user._id}/${selectedUser._id}`, {
        headers: {
          'ngrok-skip-browser-warning': '69420'
        }
      })
        .then(async (res) => {
          const data = res.data;
          // Get unique sender IDs
          const senderIds = [...new Set(data.map(msg => msg.sender))];
          // Fetch user details for each sender (if not already in users)
          const userDetails = {};
          for (const id of senderIds) {
            let userInfo = users.find(u => u._id === id);
            if (!userInfo) {
              const res = await axios.get(`${SERVER_URL}/api/users/${id}`, {
                headers: {
                  'ngrok-skip-browser-warning': '69420'
                }
              });
              userInfo = res.data;
            }
            userDetails[id] = userInfo;
          }
          // Attach sender name to each message
          const messagesWithSender = data.map(msg => ({
            ...msg,
            senderName: userDetails[msg.sender]?.username || userDetails[msg.sender]?.name || 'Unknown'
          }));
          setMessages(messagesWithSender);
        });
    } else {
      setMessages([]);
    }
  }, [selectedUser, user, users]);

  // Listen for real-time messages
  useEffect(() => {
    const handler = (msg) => {
      if (
        selectedUser &&
        (
          (msg.sender === user._id && msg.to === selectedUser._id) ||
          (msg.sender === selectedUser._id && msg.to === user._id)
        )
      ) {
        let senderName;
        if (msg.sender === user._id) {
          senderName = user.username || user.name || "You";
        } else if (msg.sender === selectedUser._id) {
          senderName = selectedUser.username || selectedUser.name || "Unknown";
        } else {
          // fallback for group or unknown sender
          const senderUser = users.find(u => u._id === msg.sender);
          senderName = senderUser?.username || senderUser?.name || "Unknown";
        }
        setMessages((prev) => [
          ...prev,
          { ...msg, senderName }
        ]);
      }
    };
    socket.on('receive-private-message', handler);
    return () => socket.off('receive-private-message', handler);
  }, [user, selectedUser, users]);

  const handleSendMessage = (content) => {
    if (!selectedUser) return;
    const msg = {
      sender: user._id,
      to: selectedUser._id,
      content,
      type: 'personal'
    };
    socket.emit('send-message', msg);
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 min-h-0">
        {/* User List Sidebar */}
        <aside className="w-80 bg-white/90 border-r border-gray-200 flex flex-col shadow-lg">
          <div className="flex-1 overflow-y-auto">
            <UserList
              users={users}
              selectedUserId={selectedUser?._id}
              onUserClick={userObj => {
                if (selectedUser && selectedUser._id === userObj._id) {
                  setSelectedUser(null); // Deselect if already selected
                } else {
                  setSelectedUser(userObj); // Select new user
                }
              }}
            />
          </div>
        </aside>
        {/* Chat Window */}
        {selectedUser ? (
          <main className="flex-1 flex flex-col p-4">
            <ChatWindow>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4 border-b border-gray-200 pb-4">
                  <img
                    src={selectedUser.avatar ? selectedUser.avatar : 'https://api.dicebear.com/7.x/initials/svg?seed=' + (selectedUser.username || selectedUser.name)}
                    alt={selectedUser.username || selectedUser.name}
                    className="w-10 h-10 rounded-full border-2 border-blue-300"
                  />
                  <div>
                    <div className="text-lg font-semibold text-blue-700">{selectedUser.username || selectedUser.name}</div>
                    <div className="text-xs text-green-500">Online</div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <MessageList
                    messages={messages.map(msg => ({
                      ...msg,
                      isOwn: msg.sender === user._id,
                    }))}
                    selectedUser={selectedUser}
                  />
                </div>
                <div className="mt-4">
                  <MessageInput onSend={handleSendMessage} />
                </div>
              </div>
            </ChatWindow>
          </main>
        ) : (
          <NoUserSelected />
        )}
      </div>
    </div>
  );
}

export default ChatScreen;