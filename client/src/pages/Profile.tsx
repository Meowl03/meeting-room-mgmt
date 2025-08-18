import React from "react";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white p-4 rounded shadow">
        <p>
          <strong>Full Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <Button onClick={logout} className="mt-4">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
