import React from 'react';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import SignOut from "../components/SignOut";

function SignOutConfirmation() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#0096FF' }}>Are you sure you want to sign out?</h1>
      <SignOut />
    </div>
  );
}

export default SignOutConfirmation;
