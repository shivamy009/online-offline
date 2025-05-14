import RegisterForm from '../components/RegisterForm';

function RegisterPage({ onLogin }) {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <RegisterForm onLogin={onLogin} />
    </div>
  );
}

export default RegisterPage;