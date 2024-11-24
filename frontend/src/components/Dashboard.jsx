import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Dashboard.css';
import { ACCESS_TOKEN } from '../token';


const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem(ACCESS_TOKEN);
                if (!accessToken) {
                    throw new Error('No access token found');
                }
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                }
                const userResponse = await api.get('http://127.0.0.1:8000/dashboard/', {headers})
                const user = userResponse.data;
                setUserData(user);
                setIsAdmin(user.is_staff);

            } catch (error) {
                console.error('Error fetching user data:', error);
                const errorMessage = error.response
                    ? error.response.data.detail || 'An error occurred while fetching user data'
                    :  "An error occurred: " + error.message
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    if (loading) return <p>Loading ....</p>
    if (error) return <p className='error-massage'>{error}</p>

    const renderUserData = () => (
        <div>
            <h2>Welcome, {userData.username}!</h2>
            {isAdmin && <p>You are an admin.</p>}
            <p>Your email: {userData.email}</p>
            <p>Status {userData.is_active ? "Active" : 'Inactive'}</p>
        </div>
    )
    const renderAdminFeatures = () => (
        <div>
            <h3>Admin Features</h3>
            {/* Admin-specific features */}
        </div>
    )

    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>


            {renderUserData()}
            {isAdmin && renderAdminFeatures()}

        </div>
    )
}
export default Dashboard;
