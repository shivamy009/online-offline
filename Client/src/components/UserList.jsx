import React from 'react';

function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>
          {user.username}
          <span
            className={user.status === 'online' ? 'green-dot' : user.status === 'idle' ? 'yellow-dot' : 'gray-dot'}
          ></span>
          {user.status === 'offline' && (
            <span> (Last seen: {new Date(user.lastActiveAt).toLocaleTimeString()})</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default UserList;