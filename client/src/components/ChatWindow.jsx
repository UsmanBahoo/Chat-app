import React from 'react';

function ChatWindow({ children }) {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-md border border-gray-200">
      {children}
    </div>
  );
}

export default ChatWindow;