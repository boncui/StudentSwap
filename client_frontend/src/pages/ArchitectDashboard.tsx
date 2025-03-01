import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ArchitectDashboard = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        //redirect non-architect users to home
        if (!user || user.role !== "Architect") {
            navigate("/");
            return;
        }
        
        const fetchSuggestions = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/suggestions', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (!response.ok){
                    throw new Error("Failed to fetch suggestions");
                }

                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        };
        
        fetchSuggestions();
    }, [token, user, navigate]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold">Architect Dashboard</h1>
            <p className="text-gray-600">View all suggestions submitted by users.</p>

            {suggestions.length === 0 ? (
                <p className="mt-4">No suggestions available.</p>
            ) : (
                <ul className="mt-4 space-y-4">
                    {suggestions.map((suggestion: any) => (
                        <li key={suggestion._id} className="border p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold">{suggestion.title}</h2>
                            <p className="text-gray-700">{suggestion.description}</p>
                            <p className="text-sm text-gray-500">Submitted by: {suggestion.user?.email || "Anonymous"}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ArchitectDashboard;