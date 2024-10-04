import React from 'react';
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";

const Profile: React.FC = () => {
    const { accounts, instance } = useMsal();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [profile, setProfile] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [apiData, setApiData] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (accounts.length > 0) {
                const response = await instance.acquireTokenSilent({
                    scopes: ["openid", "profile", "User.Read"],
                    account: accounts[0],
                });
                const accessToken = response.accessToken;
                const res = await fetch('https://graph.microsoft.com/v1.0/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await res.json();
                setProfile(data);
            }
        };
        fetchProfile();
    }, [accounts, instance]);

    useEffect(() => {
        const fetchApiData = async () => {
            if (accounts.length > 0) {
                const response = await instance.acquireTokenSilent({
                    scopes: ["api://EXPRESS_API_CLIENT_ID/access_as_user"], // Replace with your Express API Client ID
                    account: accounts[0],
                });
                const accessToken = response.accessToken;
                const res = await fetch('http://localhost:8000/api/users', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await res.json();
                setApiData(data);
            }
        };
        fetchApiData();
    }, [accounts, instance]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {profile ? (
                <div className="mb-4">
                    <h2 className="text-2xl">Hello, {profile.displayName}</h2>
                    <p>Email: {profile.mail || profile.userPrincipalName}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
            {apiData ? (
                <div>
                    <h3 className="text-xl">Backend API Data:</h3>
                    <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(apiData, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading API data...</p>
            )}
        </div>
    );
};

export default Profile;
