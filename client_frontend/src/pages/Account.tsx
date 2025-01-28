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
  
    useEffect(() => {
      const fetchUserData = async () => {
          if (!user) {
              setError('User not logged in.');
              setLoading(false);
              return;
          }

          try {
              const response = await axios.get(`http://localhost:5001/api/users/${user._id}`);
              setUserData(response.data);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div className="p-4">
          {userData ? (
              <div>
                  <h1 className="text-xl font-bold mb-4">Account Details</h1>
                  <p><strong>Name:</strong> {userData.fullName}</p>
                  <p><strong>Email:</strong> {userData.email}</p>

                  <h2 className="text-lg font-bold mt-6">Your Sublistings</h2>
                  <ul>
                      {userData.sublistings?.map((listing: any) => (
                          <li key={listing.id}>{listing.title}</li>
                      ))}
                  </ul>

                  <h2 className="text-lg font-bold mt-6">Liked Listings</h2>
                  <ul>
                      {userData.likedListings?.map((listing: any) => (
                          <li key={listing.id}>{listing.title}</li>
                      ))}
                  </ul>

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