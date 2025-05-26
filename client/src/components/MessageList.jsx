import React from 'react';
import MessageItem from './MessageItem';

function MessageList({ messages, selectedUser }) {
  return (
    <div className="flex flex-col gap-2 h-full justify-end">
      {messages && messages.length > 0 ? (
        messages.map((msg) => (
          <MessageItem
            key={msg._id}
            sender={msg.isOwn ? "You" : (selectedUser.username || selectedUser.name)}
            content={msg.content}
            isOwn={msg.isOwn}
          />
        ))
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-gray-400 py-8">
          <span className="text-5xl mb-2">💬</span>
          <span className="text-lg font-medium">No messages yet</span>
          <span className="text-sm">Start the conversation!</span>
        </div>
      )}
    </div>
  );
}

export default MessageList;