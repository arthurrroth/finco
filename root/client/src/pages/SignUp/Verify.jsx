
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook

const VerifyEmailPage = () => {
  const location = useLocation(); // Get the location object from React Router
  const [verifyCode, setVerifyCode] = useState('');
  return (
    <div>
      <h2>Verify Email Page</h2>
      <form>
        <input
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
          placeholder="Verification Code"
        />

      </form>
    </div>
  );
};

export default VerifyEmailPage;
