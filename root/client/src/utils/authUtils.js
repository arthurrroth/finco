import axios from "axios";

export const checkAuthentication = async () => {
  const accessToken = localStorage.getItem('accessToken');
  console.log({ accessToken });
  try {
    const response = await axios.get('/auth-api/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    let isAuthenticated;

    if (response.status === 200) {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    };

    const currentUser = {
      user: response,
      isAuthenticated: isAuthenticated
    };
    console.log({ currentUser });
    return currentUser

  } catch (error) {
    console.error('Error checking authentication: ', error);
    return false;
  }
};
