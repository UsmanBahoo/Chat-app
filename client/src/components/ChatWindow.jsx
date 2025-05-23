import React from 'react';

function ChatWindow({ children }) {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
}

export default ChatWindow;