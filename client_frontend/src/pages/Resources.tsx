import React, {useState} from 'react';
import axios from 'axios';

const Resources: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.post("http://localhost:5001/api/suggestion", formData);
            setSuccess("Thank You! Your feedback has been sent!");
            setFormData({ name: "", email: "", message: ""}); //Reset the Form
        } catch (err) {
            setError("Failed to send feedback. Please try again.");
        } finally{
            setLoading(false);
        }
    };

    return  (
        <div className='max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-cetner mb-6'>Suggestion Box</h2>
            <p className='text-center text-gray-600 mb-4'>
                Have an idea or found a bug? Let us know!
            </p>

            {error && <p className='text-red-500 text-center'>{error}</p>}
            {success && <p className='text-green-500 text-center'>{success}</p>}

            <form onSubmit={handleSubmit} className='space-y-4'>
                <input 
                    type="text" 
                    name="name"
                    placeholder='Your Name'
                    className='border p-2 w-full rounded'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="email" 
                    name="email"
                    placeholder='Your Email'
                    className='border p-2 w-full rounded'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <textarea 
                    name="message" 
                    placeholder='Please describe your suggestion or bug'
                    className='border p-2 w-full rounded'
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <button
                    type='submit'
                    className={`bg-blue-500 text-white py-2 px-4 w-full rounded ${(loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600")}`}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Feedback"}
                </button>
            </form>
        </div>
    );
};



export default Resources;