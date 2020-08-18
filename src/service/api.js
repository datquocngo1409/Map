import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

class API {
  login = async (username, password) => {
    try {
      let response = await fetch('https://nqd-map-api.herokuapp.com/login', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      let statusCode = response.status;
      let responseJson = await response.json();
      if (statusCode === 200) {
        await AsyncStorage.setItem('token', responseJson.token);
      } else {
        alert('Username or Password is invalid');
      }
    } catch (e) {
      alert('Exception');
    }
  };

  signup = async (user) => {
    try {
      let response = await fetch('https://nqd-map-api.herokuapp.com/signup', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      let statusCode = response.status;
      let responseJson = await response.json();
      if (statusCode === 200) {
        await AsyncStorage.setItem('isSignUpSuccess', 'true');
      } else {
        alert('Fail To Signup');
      }
    } catch (e) {
      alert('Exception');
    }
  }
}

const api = new API();
export default api;
