import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import UserList from '../components/UserList';
import ChatWindow from '../components/ChatWindow';
import useAuth from '../contexts/authProvider';
import { useNavigate } from 'react-router-dom';
import NoUserSelected from '../components/NoUserSelected';

const socket = io('http://localhost:5000');

function ChatScreen() {
  const { 
  user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login');
    }
  }, [isLoggedIn, user, navigate]);

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  

  console.log('ChatScreen user:', user.name);
  console.log('ChatScreen selectedUser:', selectedUser?.username);

  // Define fetchUsers as a function so it can be reused
  const fetchUsers = useCallback(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched users:', data);
        const filtered = data.filter(u => u.name !== user?.name);
        setUsers(filtered);
        // No auto-selection here!
      });
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

  useEffect(() => {
    const handler = (msg) => {
      if (
        (msg.sender === user._id && msg.to === selectedUser._id) ||
        (msg.sender === selectedUser?._id && msg.to === user._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on('receive-message', handler);
    return () => socket.off('receive-message', handler);
  }, [user, selectedUser]);

  useEffect(() => {
    setMessages([]);
  }, [selectedUser]);

  const handleSendMessage = (content) => {
    if (!selectedUser) return;
    const msg = {
      id: Date.now(),
      sender: user._id,
      to: selectedUser._id,
      content,
    };
    setMessages((prev) => [...prev, msg]);
    console.log('Sending message:', msg);
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
                    src={selectedUser.avatar ? selectedUser.avatar : 'https://api.dicebear.com/7.x/initials/svg?seed=' + selectedUser.username}
                    alt={selectedUser.username}
                    className="w-10 h-10 rounded-full border-2 border-blue-300"
                  />
                  <div>
                    <div className="text-lg font-semibold text-blue-700">{selectedUser.username}</div>
                    <div className="text-xs text-green-500">Online</div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <MessageList
                    messages={messages.map(msg => ({
                      ...msg,
                      isOwn: msg.sender === user._id,
                      sender: msg._id,
                      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=U',
                    }))}
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