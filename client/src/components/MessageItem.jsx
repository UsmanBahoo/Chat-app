import React from 'react';

function MessageItem({ sender, content, isOwn, timestamp }) {
  // Format the timestamp (e.g., "10:30 AM")
  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
      <div className={`flex flex-col max-w-xs ${isOwn ? 'items-end' : 'items-start'}`}>
        <span className="font-semibold text-xs mb-1">{sender}</span>
        <div className={`rounded-lg px-4 py-2 ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
          {content}
          <div className={`text-xs mt-1  ${isOwn ? 'text-gray-100 ml-auto' : 'text-gray-400' }`}>{formattedTime}</div>
        </div>
        
      </div>
    </div>
  );
}

export default MessageItem;