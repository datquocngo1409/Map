import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../service/api';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, search: '', name: '', driver: ''};
    this.arrayholder = [];
    this.getUser();
  }

  render() {
    return (
      <LinearGradient
        colors={['white', '#0A9BFA']}
        start={{x: 0.5, y: 0}}
        end={{x: 1, y: 0.9}}
        style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchBarContainer}>
            <SearchBar
              round
              searchIcon={{size: 20, color: 'white'}}
              clearIcon={{color: 'white'}}
              placeholderTextColor={'white'}
              onChangeText={(text) => this.SearchFilterFunction(text)}
              onClear={(text) => this.SearchFilterFunction('')}
              placeholder="Type Here..."
              value={this.state.search}
              containerStyle={styles.searchBar}
              inputContainerStyle={styles.inputSearchStyle}
              inputStyle={{color: 'white'}}
            />
          </View>
          <View style={styles.logoutButton}>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.logout()}>
              <Icon name="sign-out" size={30} color={'#5A2014'} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.column1}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Account')}>
              <View style={styles.diamond}>
                <View style={styles.contentDiamond}>
                  <View style={styles.center}>
                    <Icon name="user" size={60} color={'#2390F6'} />
                  </View>
                  <View style={styles.center}>
                    <Text style={styles.textDiamond}>Account</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Driver')}>
              <View style={styles.diamond}>
                <View style={styles.contentDiamond}>
                  <View style={styles.center}>
                    <Icon name="car" size={60} color={'#2390F6'} />
                  </View>
                  <View style={styles.center}>
                    <Text style={styles.textDiamond}>Driver</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.column2}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Group')}>
              <View style={styles.diamond}>
                <View style={styles.contentDiamond}>
                  <View style={styles.center}>
                    <Icon name="users" size={60} color={'#2390F6'} />
                  </View>
                  <View style={styles.center}>
                    <Text style={styles.textDiamond}>Your Group</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('MapHome')}>
              <View style={styles.diamond}>
                <View style={styles.contentDiamond}>
                  <View style={styles.center}>
                    <Icon name="map-marker" size={60} color={'#2390F6'} />
                  </View>
                  <View style={styles.center}>
                    <Text style={styles.textDiamond}>Map</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.column3}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Communication')}>
              <View style={styles.diamond}>
                <View style={styles.contentDiamond}>
                  <View style={styles.center}>
                    <Icon name="facebook-square" size={60} color={'#2390F6'} />
                  </View>
                  <View style={styles.center}>
                    <Text style={styles.textDiamond}>Communication</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Setting')}>
              <View style={styles.diamond}>
                <View style={styles.contentDiamond}>
                  <View style={styles.center}>
                    <Icon name="cogs" size={60} color={'#2390F6'} />
                  </View>
                  <View style={styles.center}>
                    <Text style={styles.textDiamond}>Setting</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
            <View style={styles.infomationShapeRight} />
          </View>
        </View>
        <View style={styles.infomation}>
          <TouchableHighlight>
            <View style={styles.infomationMain}>
              <View style={styles.infomationShapeTop} />
              <View style={styles.infomationShapeBottom}>
                <View style={styles.avatar} />
                <Text style={styles.infomationContent}>{this.state.name}</Text>
                <Text style={styles.infomationContentSub}>
                  {this.state.driver}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </LinearGradient>
    );
  }

  async getName() {
    const name = await AsyncStorage.getItem('name');
    this.setState({name: name});
  }

  async getIsDriver() {
    const driver = await AsyncStorage.getItem('driver');
    this.setState({driver: driver});
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }

  async logout() {
    await AsyncStorage.setItem('token', '');
    this.props.navigation.navigate('Login');
  }

  async getUser() {
    const token = await AsyncStorage.getItem('token');
    api.getUserByToken(token);
    this.getName();
    this.getIsDriver();
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  infomation: {
    flex: 0.25,
    flexDirection: 'row',
  },
  infomationMain: {
    flex: 0.7,
  },
  infomationSub: {
    flex: 0.3,
  },
  infomationShapeTop: {
    width: (deviceWidth * 40) / 100,
    height: 0,
    borderBottomWidth: (deviceWidth * 20) / 100,
    borderBottomColor: '#064FF8',
    borderLeftWidth: (deviceWidth * 25) / 100,
    borderLeftColor: 'transparent',
    borderRightWidth: (deviceWidth * 27) / 100,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
  },
  infomationShapeBottom: {
    width: deviceWidth,
    height: 0,
    borderBottomWidth: (deviceWidth * 37) / 100,
    borderBottomColor: '#064FF8',
    borderLeftWidth: 0,
    borderLeftColor: 'transparent',
    borderRightWidth: (deviceWidth * 48) / 100,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infomationContent: {
    color: 'white',
    fontSize: 26,
  },
  infomationContentSub: {
    color: 'white',
    fontSize: 18,
  },
  infomationShapeRight: {
    marginTop: (deviceWidth * 35) / 100,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: (deviceWidth * 42) / 100,
    borderRightWidth: (deviceWidth * 42) / 100,
    borderBottomWidth: (deviceWidth * 60) / 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#064FF8',
    transform: [{rotate: '-90deg'}],
  },
  header: {
    flexDirection: 'row',
  },
  searchBarContainer: {
    flex: 0.85,
  },
  logoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.15,
  },
  searchBar: {
    backgroundColor: 'rgba(1.0, 0, 0, 0)',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    color: 'white',
  },
  inputSearchStyle: {
    backgroundColor: '#B0ABAA',
    borderWidth: 1,
    borderColor: '#938C8B',
    color: 'white',
  },
  content: {
    flex: 0.75,
    flexDirection: 'row',
  },
  column1: {
    flex: 0.3,
  },
  column2: {
    flex: 0.3,
    marginTop: deviceWidth / 5,
  },
  column3: {
    flex: 0.3,
  },
  diamond: {
    width: deviceWidth / 3.5,
    height: deviceWidth / 3.5,
    backgroundColor: '#FBFEFA',
    transform: [{rotate: '45deg'}],
    marginTop: deviceWidth / 7,
    marginLeft: deviceWidth / 20,
    borderRadius: 15,
    shadowColor: '#000',
    borderWidth: 2,
    borderColor: '#938C8B',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    elevation: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentDiamond: {
    transform: [{rotate: '-45deg'}],
    marginTop: -10,
  },
  textDiamond: {
    fontSize: 16,
  },
  avatar: {
    width: deviceWidth / 6,
    height: deviceWidth / 6,
    backgroundColor: '#FBFEFA',
    transform: [{rotate: '45deg'}],
    borderRadius: 15,
    shadowColor: '#000',
    borderWidth: 2,
    borderColor: '#938C8B',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,
    elevation: 22,
    marginBottom: 10,
    marginTop: 30,
    marginRight: 10,
  },
});
