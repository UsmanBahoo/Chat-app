import React from 'react';

function MessageItem({ sender, content, isOwn }) {
  return (
    <div className={`flex items-end mb-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs break-words shadow
          ${isOwn
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-900 rounded-bl-none'
          }`}
      >
        {!isOwn && (
          <span className="block text-xs font-semibold text-blue-700 mb-1">{sender}</span>
        )}
        <span className="block text-sm">{content}</span>
      </div>
    </div>
  );
}

export default MessageItem;