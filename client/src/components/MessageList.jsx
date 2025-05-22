import React from 'react';
import MessageItem from './MessageItem';

function MessageList({ messages }) {
  return (
    <div className="flex flex-col gap-2">
      {messages && messages.length > 0 ? (
        messages.map((msg) => (
          <MessageItem
            key={msg.id}
            sender={msg.sender}
            avatar={msg.avatar}
            content={msg.content}
            isOwn={msg.isOwn}
          />
        ))
      ) : (
        <div className="text-center text-gray-400 py-8">No messages yet.</div>
      )}
    </div>
  );
}

export default MessageList;