import React, { useState, useEffect } from "react";
import api from "../api"; // API instance setup

const ProfilePage = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        date_of_birth: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/user/");
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put("/user/", user);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="profile-container">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>User Profile</h2>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            name="date_of_birth"
                            value={user.date_of_birth || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Save Changes</button>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;
