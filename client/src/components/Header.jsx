import React from 'react';
import useAuth from '../contexts/authProvider';

function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white/90 border-b border-gray-200 shadow-sm">
      {/* App Logo/Name */}
      <div className="flex items-center gap-2">
        <span className="inline-block bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg shadow">
          💬
        </span>
        <span className="text-xl font-bold text-blue-700 tracking-wide">ChatApp</span>
      </div>
      {/* User Info */}
      <div className="flex items-center gap-4">
        {user && (
          <>
            <img
              src={user.avatar ? user.avatar : 'https://api.dicebear.com/7.x/initials/svg?seed=' + user.username}
              alt={user.username}
              className="w-9 h-9 rounded-full border-2 border-blue-300 object-cover"
            />
            <span className="font-medium text-blue-700">{user.username}</span>
            <button
              onClick={logout}
              className="ml-2 px-4 py-1 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;