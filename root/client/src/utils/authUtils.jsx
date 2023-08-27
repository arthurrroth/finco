import axios from "axios";

export const checkAuthentication = async () => {

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  console.log({ accessToken });

  let isAuthenticated;

  try {

    let currentUser = {
      user: null,
      isAuthenticated: false
    };

    try {
      let response = await axios.get('/auth-api/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });


      if (response.status === 200) {
        isAuthenticated = true;
      }

      currentUser = {
        user: response,
        isAuthenticated: isAuthenticated
      }
    } catch (error) {
      let refreshRes = await axios.get('/auth-api/sessions/refresh', {
        headers: {
          "x-refresh": `${refreshToken}`
        }
      });

      response = await axios.get('/auth-api/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });


      if (refreshRes.status === 200) {
        isAuthenticated = true;

      } else {
        isAuthenticated = false;
      };

      currentUser = {
        user: response,
        isAuthenticated: isAuthenticated
      }

    };



    console.log({ currentUser });
    return currentUser

  } catch (error) {
    console.error('Error checking authentication: ', error);
    return false;
  }
};
