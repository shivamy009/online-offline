function UserTable({ users }) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Email</th>
          <th className="border p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="text-center">
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">
              <span
                className={`px-2 py-1 rounded ${
                  user.status === 'online' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                }`}
              >
                {user.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;