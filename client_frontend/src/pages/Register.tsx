import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api'; 

const Register:React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await register ({fullName, email, password}); // call register API
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className = "flex justify-center items-center min-h-screen">
            <form
                className= "bg-white p-6 rounded shadow-md w-80"
                onSubmit = {handleRegister}
            >
                <h1 className="text-xl font-bold mb-4">Register</h1>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Create password here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm password here"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border p-2 w-full mb-4 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 w-full rounded hover:bg-blue-600"
                >Register</button>
            </form>
        </div>
    );
};

export default Register;