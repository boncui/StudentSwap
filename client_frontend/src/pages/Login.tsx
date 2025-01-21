import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../services/api';

const Login:React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className = "flex justify-center items-center min-h-screen bg-gray-100">
            <form
                className="bg-white p-6 rounded shadow-md w-80"
                onSubmit={handleLogin}
            >
                <h1 className="text-xl font-bold mb-4">Login</h1>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600"
                    disabled = {loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;