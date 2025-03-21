import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';

//Create the interface
interface User {
    id: string;
    fullName: string;
    email: string;
    sublistings: Array<{id: string; title: string; }>;
    likedListings: Array<{id: string; title: string;}>
}

const Account: React.FC = () => {
    const { user, logout } = useAuth();  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [userListings, setUserListings] = useState<any[]>([]);
    const [editListing, setEditListing] = useState<any | null>(null);

  
    useEffect(() => {
      const fetchUserData = async () => {
          if (!user) {
              setError('User not logged in.');
              setLoading(false);
              return;
          }

          try {
            //Fetch user details
            const userResponse = await axios.get(`http://localhost:5001/api/users/${user._id}`);
            setUserData(userResponse.data);

            //Fetch user's Listings
            const listingResponse = await axios.get(`http://localhost:5001/api/housing-contracts/user/${user._id}`);
            setUserListings(listingResponse.data);

          } catch (err) {
              setError('Failed to load user details');
          } finally {
              setLoading(false);
          }
      };

      fetchUserData();
  }, [user]);

  

  const handleDeleteAccount = async () => {
      if (!user) return;

      const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

      if (confirmDelete) {
          try {
              await axios.delete(`http://localhost:5001/api/users/${user._id}`);
              alert('Your account has been deleted successfully.');
              logout(); // ✅ Use logout() from useAuth() to clear state and localStorage
          } catch (err) {
              alert('Failed to delete account. Please try again.');
          }
      }
  };

  const handleDeleteListing = async (listingId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:5001/api/housing-contracts/${listingId}`);
        setUserListings((prevListings) => prevListings.filter((listing) => listing._id !== listingId));
    } catch (error) {
        alert("Failed to delete listing. Please try again.");
    }
  };

  // 🚀 Debugging: Check if postedBy exists
  useEffect(() => {
    console.log("Fetched Listings: ", userListings);
  }, [userListings]);


  //Handle Edit Listings
  const handleEditListing = (listing: any) => {
    setEditListing(listing);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editListing) return;
    setEditListing({... editListing, [e.target.name]: e.target.value})
  }

  const handleSaveListing = async () => {
    if (!editListing) return;

    try {
        const response = await axios.put(
            `http://localhost:5001/api/housing-contracts/${editListing._id}`,
            editListing
          );
    
          setUserListings((prevListings) =>
            prevListings.map((listing) =>
              listing._id === editListing._id ? response.data : listing
            )
          );
    
          setEditListing(null);
        } catch (error) {
          alert("Failed to update listing. Please try again.");
        }
      };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {userData ? (
        <div>
          <h1 className="text-xl font-bold mb-4">Account Details</h1>
          <p><strong>Name:</strong> {userData.fullName}</p>
          <p><strong>Email:</strong> {userData.email}</p>

          <h2 className="text-lg font-bold mt-6">Your Listings</h2>
          {userListings.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userListings.map((listing) => (
                <li key={listing._id} className="border-2 p-3 rounded-lg shadow-md border-gray-500 dark:border-gray-400">
                  {editListing && editListing._id === listing._id ? (
                    <div>
                        <input
                        type="text"
                        name="title"
                        value={editListing.title}
                        onChange={handleChange}
                        className="border p-1 w-full rounded"
                        />
                        <input
                        type="text"
                        name="location"
                        value={editListing.location}
                        onChange={handleChange}
                        className="border p-1 w-full rounded"
                        />
                        <input
                        type="number"
                        name="monthlyRent"
                        value={editListing.monthlyRent}
                        onChange={handleChange}
                        className="border p-1 w-full rounded"
                        />
                        <textarea
                        name="description"
                        value={editListing.description || ""}
                        onChange={handleChange}
                        className="border p-1 w-full rounded"
                        />
                        <button
                        onClick={handleSaveListing}
                        className="bg-green-500 text-white px-3 py-1 mt-2 rounded hover:bg-green-600"
                        >
                        Save
                        </button>
                        <button
                        onClick={() => setEditListing(null)}
                        className="ml-2 bg-gray-500 text-white px-3 py-1 mt-2 rounded hover:bg-gray-600"
                        >
                        Cancel
                        </button>
                    </div>
                    ) : (
                    // ✅ Wrap with Fragment to resolve TS error
                    <>
                        <p><strong>{listing.title}</strong></p>
                        <p>${listing.monthlyRent} / month</p>
                        <p><strong>Location:</strong> {listing.location}</p>

                        {listing.postedBy && listing.postedBy._id && user._id === listing.postedBy._id ? (
                        <button
                            onClick={() => handleEditListing(listing)}
                            className="bg-blue-500 text-white px-3 py-1 mt-2 rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        ) : (
                        <p className="text-gray-400 text-sm">Cannot edit this listing</p>
                        )}


                        <button
                        onClick={() => handleDeleteListing(listing._id)}
                        className="bg-red-500 text-white px-3 py-1 mt-2 ml-2 rounded hover:bg-red-600"
                        >
                        Delete
                        </button>
                    </>
                    )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You have not created a listing yet.</p>
          )}

          <button
            onClick={handleDeleteAccount}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      ) : (
        <p>Your account has been deleted or you are not logged in.</p>
      )}
    </div>
  );
};

export default Account;