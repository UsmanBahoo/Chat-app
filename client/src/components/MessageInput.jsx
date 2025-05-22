import React, { useState } from 'react';

function MessageInput({ onSend }) {
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value);
      setValue('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        type="text"
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
      />
      <button type="submit" className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
        Send
      </button>
    </form>
  );
}

export default MessageInput;