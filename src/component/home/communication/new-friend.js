import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../../service/api';

export default class NewFriend extends Component {
  state = {
    users: [],
  };
  constructor(props) {
    super(props);
    this.getRecommendFriends();
  }

  async getRecommendFriends() {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');
    api.getFriends(token, userId);
    api.getRecommendFriends(token, userId);
    const friendsString = await AsyncStorage.getItem('friendsRecommend');
    if (friendsString.length > 2) {
      const friends = JSON.parse(friendsString);
      this.setState({users: friends});
    }
  }

  render() {
    return (
      <LinearGradient
        colors={['white', '#0A9BFA']}
        start={{x: 0.5, y: 0}}
        end={{x: 1, y: 0.9}}
        style={styles.container}>
        <FlatList
          style={styles.friendListContainer}
          enableEmptySections={true}
          data={this.state.users}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity>
                <View style={styles.box}>
                  <View style={styles.cardContent}>
                    <Image style={styles.image} source={{uri: item.image}} />
                    <Text style={styles.username}>{item.name}</Text>
                  </View>
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      onPress={() => this.addFriend(item, item.id)}>
                      <View style={styles.addButton}>
                        <Icon name="user-plus" size={32} color={'white'} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </LinearGradient>
    );
  }

  async addFriend(item, id) {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');
    api.addFriend(token, userId, id);
    const result = await AsyncStorage.getItem('addedFriendSuccess');
    if (result === 'true') {
      await AsyncStorage.setItem('addedFriendSuccess', '');
      this.state.users.splice(this.state.users.indexOf(item), 1);
      api.getFriends(token, userId);
      api.getRecommendFriends(token, userId);
      this.forceUpdate();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    padding: 30,
    backgroundColor: '#E6E6FA',
  },
  box: {
    padding: 5,
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
    width: '90%',
    marginLeft: '5%',
    borderRadius: 20,
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
  },
  cardContent: {
    flexDirection: 'row',
    flex: 0.8,
  },
  addButtonContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#2390F6',
    width: 70,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});
