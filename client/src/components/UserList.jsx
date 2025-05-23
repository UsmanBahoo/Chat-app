import React from 'react';

function UserList({ users, selectedUserId, onUserClick }) {
  return (
    <div className="p-2">
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user._id}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition
              ${selectedUserId === user._id ? 'bg-blue-100 shadow font-semibold' : 'hover:bg-blue-50'}
            `}
            onClick={() => onUserClick(user)}
          >
            <img
              src={user.avatar ? user.avatar : 'https://api.dicebear.com/7.x/initials/svg?seed=' + (user.username || user.name)}
              alt={user.username || user.name}
              className={`w-10 h-10 rounded-full border-2 ${user.online ? 'border-green-400' : 'border-gray-300'}`}
            />
            <div className="flex-1">
              <span className="font-medium text-gray-800">{user.username || user.name}</span>
              <span
                className={`ml-2 inline-block w-2 h-2 rounded-full ${user.online ? 'bg-green-500' : 'bg-gray-400'}`}
                title={user.online ? 'Online' : 'Offline'}
              ></span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;