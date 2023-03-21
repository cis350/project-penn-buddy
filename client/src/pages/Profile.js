import React from 'react';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import UserInfo from '../components/UserInfo';

function Profile() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#0096FF' }}>Welcome to Your Profile!</h1>
      <UserInfo />
    </div>
  );
}
export default Profile;
