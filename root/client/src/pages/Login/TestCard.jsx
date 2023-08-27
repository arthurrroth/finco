import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const TestCard = () => {
  const location = useLocation();
  const userID = location.state.userID;
  const [account, setAccount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userRes = await axios.get('/auth-api/users/me');
    const user = userRes.data;

    const reqBody = {
      id: user._id
    };

    const response = await axios.post('/auth-api/users/acc', reqBody);
    const userAcc = response.data;
    console.log({ userAcc })



    let data = JSON.stringify({
      "id": userID
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/auth-api/users/acc',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        const userAcc = response.data;
        console.log({ userAcc })
        setAccount(userAcc.displayname);

      })
      .catch((error) => {
        console.log(error);
      });
  }



  return (
    <div>
      <h2>Test Card Create</h2>
      <h3>User ID: {userID}</h3>
      <p>{account}</p>
      <button onClick={handleSubmit}>Click</button>
    </div>
  )
}

export default TestCard
