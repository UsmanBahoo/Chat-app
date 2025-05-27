import React from 'react';

function ChatWindow({ children }) {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {children}
    </div>
  );
}

export default ChatWindow;