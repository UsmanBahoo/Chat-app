import React from 'react';

function ChatWindow({ children }) {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-blue-50 rounded-t-lg">
        <h2 className="text-xl font-semibold text-blue-700">Chat Room</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
}

export default ChatWindow;