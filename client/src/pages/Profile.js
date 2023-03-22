import React, { useState, useEffect } from 'react';
import UserInfo from '../components/UserInfo';
import { getUserById } from "../api/users";

function Profile({ userId }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userYear, setUserYear] = useState('');
  const [userMajor, setUserMajor] = useState('');
  const [userVenmo, setUserVenmo] = useState('');
  const [userBio, setUserBio] = useState('');

  useEffect(() => {
    async function getProfileInfoWrapper() {
      console.log('Hi');
      const response = await getUserById(userId);
      console.log('Profile Info', response);
      setUserName(response.name);
      setUserEmail(response.email);
      setUserVenmo(response.venmo);
    }
    getProfileInfoWrapper();
  }, [userName, userEmail, userVenmo]);

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#0096FF' }}>Welcome to Your Profile!</h1>
      <UserInfo
        userName={userName}
        userEmail={userEmail}
        userNumber={userNumber}
        userYear={userYear}
        userMajor={userMajor}
        userVenmo={userVenmo}
        userBio={userBio}
      />
    </div>
  );
}
export default Profile;
