import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ListWithUs: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        startOfLease: "",
        endOfLease: "",
        monthlyRent: "",
        utilityFee: "",
        moveInFee: "",
        moveOutFee: "",
        rooms: "",
        baths: "",
        description: "",
        isSublease: false,
        isApartment: false,
        availabilityStatus: "Available",
        features: {
            washer: false,
            dryer: false,
            furnished: false,
            gym: false,
            parking: false,
            petsAllowed: false,
            dishwasher: false,
            fridge: false,
            freezer: false,
            microwave: false, // ✅ New Feature
            squareFootage: "",
        },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Handle all input forms
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            
            // ✅ Handle "isApartment" separately
            if (name === "isApartment") {
                setFormData((prevState) => ({
                    ...prevState,
                    isApartment: checked,
                }));
                return;
            }
    
            // ✅ Handle features checkboxes
            if (name.startsWith("features.")) {
                const featureName = name.split(".")[1];
                setFormData((prevState) => ({
                    ...prevState,
                    features: {
                        ...prevState.features,
                        [featureName]: checked,
                    },
                }));
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: checked,
                }));
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: ["monthlyRent", "utilityFee", "moveInFee", "moveOutFee", "rooms", "baths", "features.squareFootage"].includes(name)
                    ? value === "" ? 0 : Number(value)
                    : value,
            }));
        }
    };
    

    // Handle Form Submissions
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!user) {
            setError("You must be logged in to submit a listing.");
            setLoading(false);
            return;
        }

        // Ensure numeric fields are properly converted before sending to the API
        const formattedData = {
            ...formData,
            monthlyRent: Number(formData.monthlyRent),
            utilityFee: Number(formData.utilityFee),
            moveInFee: Number(formData.moveInFee),
            moveOutFee: Number(formData.moveOutFee),
            rooms: Number(formData.rooms),
            baths: Number(formData.baths),
            isApartment: Boolean(formData.isApartment),
            features: {
                ...formData.features,
                squareFootage: Number(formData.features.squareFootage),
            },
            postedBy: user._id, // Attach User ID
        };

        //for debugging
        console.log("Submitting form data:", formData.features);

        try {
            await axios.post("http://localhost:5001/api/housing-contracts/create", formattedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            setSuccess("Listing submitted successfully!");

            // Reset form after successful submission
            setFormData({
                title: "",
                location: "",
                startOfLease: "",
                endOfLease: "",
                monthlyRent: "",
                utilityFee: "",
                moveInFee: "",
                moveOutFee: "",
                rooms: "",
                baths: "",
                description: "",
                isSublease: false,
                isApartment: false,
                availabilityStatus: "Available",
                features: {
                    washer: false,
                    dryer: false,
                    furnished: false,
                    gym: false,
                    parking: false,
                    petsAllowed: false,
                    dishwasher: false,
                    fridge: false,
                    freezer: false,
                    microwave: false, // ✅ Reset New Feature
                    squareFootage: "",
                },
            });

            setTimeout(() => navigate("/dashboard"), 2000); // Redirect after success
        } catch (err) {
            setError("Failed to submit listing. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2x1 mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">List Your Contract</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Descriptive Title"
                    className="border p-2 w-full rounded"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location/ Address"
                    className="border p-2 w-full rounded"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
                <div className="flex space-x-4">
                    <p>Lease Start</p>
                    <input
                        type="date"
                        name="startOfLease"
                        className="border p-2 w-1/2 rounded"
                        value={formData.startOfLease}
                        onChange={handleChange}
                    />
                    <p>Lease End</p>
                    <input
                        type="date"
                        name="endOfLease"
                        className="border p-2 w-1/2 rounded"
                        value={formData.endOfLease}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex space-x-4">
                    <input
                        type="number"
                        name="monthlyRent"
                        placeholder="Monthly Rent ($)"
                        className="border p-2 w-1/2 rounded"
                        value={formData.monthlyRent}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="utilityFee"
                        placeholder="Estimated Utility Fee ($)"
                        className="border p-2 w-1/2 rounded"
                        value={formData.utilityFee}
                        onChange={handleChange}
                    />
                </div>

                <textarea
                    name="description"
                    placeholder="Description of the listing"
                    className="border p-2 w-full rounded"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="isSublease"
                        checked={formData.isSublease}
                        onChange={handleChange}
                    />
                    <span>Is this a sublease?</span>
                </label>

                <label className='flex items-center space-x-2'>
                    <input
                        type="checkbox"
                        name="isApartment"
                        checked={formData.isApartment}
                        onChange={handleChange}
                    />
                    <span>Is this an apartment?</span>
                </label>

                <h3 className="font-semibold">Features:</h3>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        "furnished",
                        "washer",
                        "dryer",
                        "dishwasher",
                        "fridge",
                        "freezer",
                        "microwave",
                        "gym",
                        "parking",
                        "petsAllowed",
                    ].map((feature) => (
                        <label key={feature} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name={`features.${feature}`}
                                checked={Boolean(formData.features[feature as keyof typeof formData.features])}
                                onChange={handleChange}
                            />
                            <span>{feature.charAt(0).toUpperCase() + feature.slice(1)}</span>
                        </label>
                    ))}
                </div>

                <button
                    type="submit"
                    className={`bg-blue-500 text-white py-2 px-4 w-full rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : success ? "Redirecting..." : "Submit Listing"}
                </button>
            </form>
        </div>
    );
};

export default ListWithUs;
