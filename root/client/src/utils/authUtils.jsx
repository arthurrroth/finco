import axios from "axios";

export const checkAuthentication = async () => {

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  console.log({ accessToken });

  try {

    let response = await axios.get('/auth-api/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    let isAuthenticated;

    if (response.status === 200) {
      isAuthenticated = true;

    } else {

      response = await axios.get('/auth-api/sessions/refresh', {
        headers: {
          "x-refresh": `${refreshToken}`
        }
      });

      if (refreshRes.status === 200) {
        isAuthenticated = true;

      } else {
        isAuthenticated = false;
      };

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
