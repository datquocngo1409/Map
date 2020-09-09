import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../../service/api';
import AsyncStorage from '@react-native-community/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import NewFriend from './new-friend';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class Friend extends Component {
  state = {
    users: [],
  };

  constructor(props) {
    super(props);
    this.getFriends();
  }

  async getFriends() {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');
    api.getFriends(token, userId);
    api.getRecommendFriends(token, userId);
    const friendsString = await AsyncStorage.getItem('friends');
    const friends = JSON.parse(friendsString);
    this.setState({users: friends});
  }

  render() {
    return (
      <LinearGradient
        colors={['white', '#0A9BFA']}
        start={{x: 0.5, y: 0}}
        end={{x: 1, y: 0.9}}
        style={styles.container}>
        <View style={styles.header}>
          <View style={styles.goHomeContainer}>
            <TouchableHighlight
              style={[styles.goHome]}
              onPress={() => this.props.navigation.navigate('Communication')}>
              <Icon name="angle-left" size={30} color={'#5A2014'} />
            </TouchableHighlight>
          </View>
          <View style={styles.tittleContainer}>
            <Text style={styles.headerTittleText}>YOUR FRIEND</Text>
          </View>
          <View style={styles.refresh}>
            <TouchableHighlight
              style={[styles.goHome]}
              onPress={() => this.getFriends()}>
              <Icon name="refresh" size={20} color={'#5A2014'} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.content}>
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
                      <Image
                        style={styles.avatar}
                        source={{uri: item.avatar}}
                      />
                      <Text style={styles.username}>{item.name}</Text>
                    </View>
                    <View style={styles.addButtonContainer}>
                      <View style={styles.addButton}>
                        <Icon name="info" size={15} color={'white'} />
                      </View>
                      <TouchableOpacity
                        onPress={async () => {
                          this.unFriend(item, item.id);
                        }}>
                        <View style={styles.addButtonUnfriend}>
                          <Icon name="user-times" size={15} color={'white'} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <View style={styles.buttonBottom}>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.RBSheet.open()}>
              <Text style={styles.loginText}>ADD NEW FRIEND</Text>
            </TouchableHighlight>
            <RBSheet
              ref={(ref) => {
                this.RBSheet = ref;
              }}
              height={deviceHeight * 0.8}
              openDuration={deviceWidth}
              customStyles={{
                container: {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              }}>
              <NewFriend />
            </RBSheet>
          </View>
        </View>
      </LinearGradient>
    );
  }

  async unFriend(item, id) {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');
    api.unFriend(token, userId, id);
    const result = await AsyncStorage.getItem('unFriendSuccess');
    if (result === 'true') {
      this.state.users.splice(this.state.users.indexOf(item), 1);
      await AsyncStorage.setItem('unFriendSuccess', '');
      api.getFriends(token, userId);
      api.getRecommendFriends(token, userId);
      this.forceUpdate();
    }
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 0.05,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  goHomeContainer: {
    flex: 0.1,
    marginLeft: '2%',
  },
  tittleContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-9%',
  },
  refresh: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goHome: {
    marginLeft: 0,
  },
  headerTittleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    flex: 0.95,
    flexDirection: 'column',
  },
  buttonBottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: '5%',
    width: '80%',
    marginLeft: '10%',
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    marginBottom: 10,
    backgroundColor: 'orange',
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
    marginTop: 5,
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
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: '#2390F6',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  addButtonUnfriend: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
});
