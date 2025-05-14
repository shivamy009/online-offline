import { Navigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import UserTable from '../components/UserTable';

function DashboardPage({ user, users, onLogout }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Status System</h1>
      <p className="mb-4">Welcome, {user.email}!</p>
      <LogoutButton onLogout={onLogout} />
      <h2 className="text-xl font-semibold mt-6 mb-2">All Users</h2>
      <UserTable users={users} />
    </div>
  );
}

export default DashboardPage;