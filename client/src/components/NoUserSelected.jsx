import React from 'react';

function NoUserSelected() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4 shadow">
        <span className="text-4xl">💬</span>
      </div>
      <div className="text-xl font-semibold mb-2">No User Selected</div>
      <div className="text-base">Please select a user to start chatting</div>
    </div>
  );
}

export default NoUserSelected;