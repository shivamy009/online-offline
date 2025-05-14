import LoginForm from '../components/LoginForm';

function LoginPage({ onLogin }) {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <LoginForm onLogin={onLogin} />
    </div>
  );
}

export default LoginPage;