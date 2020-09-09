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
      alert('Exception Login: ' + e);
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
      alert('Exception SignUp: ' + e);
    }
  };

  getUserByToken = async (token: string) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/user/byToken',
        {
          method: 'post',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: token,
        },
      );
      let statusCode = response.status;
      let responseJson = await response.json();
      if (statusCode === 200) {
        await AsyncStorage.setItem('user', JSON.stringify(responseJson));
        await AsyncStorage.setItem('name', responseJson.name);
        await AsyncStorage.setItem('userId', responseJson.id.toString());
        await AsyncStorage.setItem(
          'driver',
          responseJson.driver == true ? 'Driver' : 'Passenger',
        );
      } else {
        alert('Fail To get User by Token');
      }
    } catch (e) {
      alert('Exception get User: ' + e);
    }
  };

  getUsers = async (token) => {
    try {
      let response = await fetch('https://nqd-map-api.herokuapp.com/user', {
        method: 'get',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      let statusCode = response.status;
      let responseJson = await response.json();
      if (statusCode === 200) {
        await AsyncStorage.setItem('users', JSON.stringify(responseJson));
      } else {
        alert('Fail To get Users');
      }
    } catch (e) {
      alert('Exception get Users: ' + e);
    }
  };

  getFriends = async (token, id) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/getFriend/' + id,
        {
          method: 'get',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let statusCode = response.status;
      let responseJson = await response.json();
      if (statusCode === 200) {
        await AsyncStorage.setItem('friends', JSON.stringify(responseJson));
      } else {
        alert('Fail To get Friends');
      }
    } catch (e) {
      alert('Exception get Friends: ' + e);
    }
  };

  getRecommendFriends = async (token, id) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/getNotFriend/' + id,
        {
          method: 'get',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let statusCode = response.status;
      if (statusCode === 200) {
        let responseJson = await response.json();
        await AsyncStorage.setItem(
          'friendsRecommend',
          JSON.stringify(responseJson),
        );
      } else if (statusCode === 204) {
        await AsyncStorage.setItem('friendsRecommend', '');
      } else {
        alert('Fail To get Recommend Friends');
      }
    } catch (e) {
      alert('Exception get Recommend Friends: ' + e);
    }
  };

  getFamilyMembers = async (token, id) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/getFamilyMember/' + id,
        {
          method: 'get',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let statusCode = response.status;
      let responseJson = await response.json();
      if (statusCode === 200) {
        await AsyncStorage.setItem(
          'familyMembers',
          JSON.stringify(responseJson),
        );
      } else {
        alert('Fail To get FamilyMembers');
      }
    } catch (e) {
      alert('Exception get FamilyMembers: ' + e);
    }
  };

  getRecommendFamilyMembers = async (token, id) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/getNotFamilyMember/' + id,
        {
          method: 'get',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let statusCode = response.status;
      if (statusCode === 200) {
        let responseJson = await response.json();
        await AsyncStorage.setItem(
          'familyMembersRecommend',
          JSON.stringify(responseJson),
        );
      } else if (statusCode === 204) {
        await AsyncStorage.setItem('familyMembersRecommend', '');
      } else {
        alert('Fail To get Recommend FamilyMembers');
      }
    } catch (e) {
      alert('Exception get Recommend FamilyMembers: ' + e);
    }
  };

  getColleagues = async (token, id) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/getColleague/' + id,
        {
          method: 'get',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let statusCode = response.status;
      let responseJson = await response.json();
      if (statusCode === 200) {
        await AsyncStorage.setItem('colleagues', JSON.stringify(responseJson));
      } else {
        alert('Fail To get Colleagues');
      }
    } catch (e) {
      alert('Exception get Colleagues: ' + e);
    }
  };

  getRecommendColleagues = async (token, id) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/getNotColleague/' + id,
        {
          method: 'get',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let statusCode = response.status;
      if (statusCode === 200) {
        let responseJson = await response.json();
        await AsyncStorage.setItem(
          'colleaguesRecommend',
          JSON.stringify(responseJson),
        );
      } else if (statusCode === 204) {
        let responseJson = await response.json();
        await AsyncStorage.setItem('colleaguesRecommend', '');
      } else {
        alert('Fail To get Recommend Colleagues');
      }
    } catch (e) {
      alert('Exception get Recommend Colleagues: ' + e);
    }
  };

  updateAccount = async (token, user) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/user/' + user.id,
        {
          method: 'patch',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify(user),
        },
      );
      let statusCode = response.status;
      let responseJson = await response.json();
      if (statusCode === 200) {
        await AsyncStorage.setItem('updateAccountSuccess', 'true');
      } else {
        alert('Fail To Update Account');
      }
    } catch (e) {
      alert('Exception Update Account: ' + e);
    }
  };

  addFriend = async (token, userId, friendId) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/addFriend/' +
          userId +
          '/' +
          friendId,
        {
          method: 'patch',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let statusCode = response.status;
      if (statusCode === 200) {
        await AsyncStorage.setItem('addedFriendSuccess', 'true');
      } else {
        alert('Fail To Add Friend');
      }
    } catch (e) {
      alert('Exception Add Friend: ' + e);
    }
  };

  addFamily = async (token, userId, familyId) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/addFamilyMember/' +
          userId +
          '/' +
          familyId,
        {
          method: 'patch',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let statusCode = response.status;
      if (statusCode === 200) {
        await AsyncStorage.setItem('addedFamilySuccess', 'true');
      } else {
        alert('Fail To Add Family');
      }
    } catch (e) {
      alert('Exception Add Family: ' + e);
    }
  };

  addColleague = async (token, userId, colleagueId) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/addColleague/' +
          userId +
          '/' +
          colleagueId,
        {
          method: 'patch',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let statusCode = response.status;
      if (statusCode === 200) {
        await AsyncStorage.setItem('addedColleagueSuccess', 'true');
      } else {
        alert('Fail To Add Colleague');
      }
    } catch (e) {
      alert('Exception Add Colleague: ' + e);
    }
  };

  unFriend = async (token, userId, friendId) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/unFriend/' + userId + '/' + friendId,
        {
          method: 'patch',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let statusCode = response.status;
      if (statusCode === 200) {
        await AsyncStorage.setItem('unFriendSuccess', 'true');
      } else {
        alert('Fail To UnFriend');
      }
    } catch (e) {
      alert('Exception unFriend: ' + e);
    }
  };

  unFamily = async (token, userId, familyId) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/unFamilyMenber/' +
          userId +
          '/' +
          familyId,
        {
          method: 'patch',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let statusCode = response.status;
      if (statusCode === 200) {
        await AsyncStorage.setItem('unFamilySuccess', 'true');
      } else {
        alert('Fail To UnFamily');
      }
    } catch (e) {
      alert('Exception UnFamily: ' + e);
    }
  };

  unColleague = async (token, userId, colleagueId) => {
    try {
      let response = await fetch(
        'https://nqd-map-api.herokuapp.com/unColleague/' +
          userId +
          '/' +
          colleagueId,
        {
          method: 'patch',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let statusCode = response.status;
      if (statusCode === 200) {
        await AsyncStorage.setItem('unColleagueSuccess', 'true');
      } else {
        alert('Fail To UnColleague');
      }
    } catch (e) {
      alert('Exception UnColleague: ' + e);
    }
  };
}

const api = new API();
export default api;
