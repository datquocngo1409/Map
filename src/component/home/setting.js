import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {search: ''};
  }

  async logout() {
    await AsyncStorage.setItem('token', '');
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <LinearGradient
        colors={['white', '#0A9BFA']}
        start={{x: 0.5, y: 0}}
        end={{x: 1, y: 0.9}}
        style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.goHomeContainer}>
              <TouchableHighlight
                style={[styles.goHome]}
                onPress={() => this.props.navigation.navigate('Home')}>
                <Icon name="angle-left" size={30} color={'#5A2014'} />
              </TouchableHighlight>
            </View>
            <View style={styles.tittleContainer}>
              <Text style={styles.headerTittleText}>SETTING</Text>
            </View>
          </View>
          <View style={styles.content}>
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
            <View style={styles.field}>
              <View style={styles.icon}>
                <Icon name="user-plus" size={24} />
              </View>
              <View style={styles.fieldValue}>
                <Text style={styles.fieldValueText}>
                  Following and Invite friend
                </Text>
              </View>
              <View style={styles.more}>
                <Icon name="angle-right" size={24} />
              </View>
            </View>
            <View style={styles.field}>
              <View style={styles.icon}>
                <Icon name="history" size={24} />
              </View>
              <View style={styles.fieldValue}>
                <Text style={styles.fieldValueText}>Your Activity</Text>
              </View>
              <View style={styles.more}>
                <Icon name="angle-right" size={24} />
              </View>
            </View>
            <View style={styles.field}>
              <View style={styles.icon}>
                <Icon name="bell" size={24} />
              </View>
              <View style={styles.fieldValue}>
                <Text style={styles.fieldValueText}>Notification</Text>
              </View>
              <View style={styles.more}>
                <Icon name="angle-right" size={24} />
              </View>
            </View>
            <View style={styles.field}>
              <View style={styles.icon}>
                <Icon name="lock" size={24} />
              </View>
              <View style={styles.fieldValue}>
                <Text style={styles.fieldValueText}>Privacy</Text>
              </View>
              <View style={styles.more}>
                <Icon name="angle-right" size={24} />
              </View>
            </View>
            <View style={styles.field}>
              <View style={styles.icon}>
                <Icon name="shield" size={24} />
              </View>
              <View style={styles.fieldValue}>
                <Text style={styles.fieldValueText}>Security</Text>
              </View>
              <View style={styles.more}>
                <Icon name="angle-right" size={24} />
              </View>
            </View>
            <View style={styles.field}>
              <View style={styles.icon}>
                <Icon name="fire" size={24} />
              </View>
              <View style={styles.fieldValue}>
                <Text style={styles.fieldValueText}>Advertisement</Text>
              </View>
              <View style={styles.more}>
                <Icon name="angle-right" size={24} />
              </View>
            </View>
            <View style={styles.field}>
              <View style={styles.icon}>
                <Icon name="user-circle" size={24} />
              </View>
              <View style={styles.fieldValue}>
                <Text style={styles.fieldValueText}>Account</Text>
              </View>
              <View style={styles.more}>
                <Icon name="angle-right" size={24} />
              </View>
            </View>
            <View style={styles.field}>
              <View style={styles.icon}>
                <Icon name="question-circle" size={24} />
              </View>
              <View style={styles.fieldValue}>
                <Text style={styles.fieldValueText}>Help</Text>
              </View>
              <View style={styles.more}>
                <Icon name="angle-right" size={24} />
              </View>
            </View>
            <View style={styles.field}>
              <View style={styles.icon}>
                <Icon name="info-circle" size={24} />
              </View>
              <View style={styles.fieldValue}>
                <Text style={styles.fieldValueText}>Introduction</Text>
              </View>
              <View style={styles.more}>
                <Icon name="angle-right" size={24} />
              </View>
            </View>
          </View>
          <View style={styles.account}>
            <View style={styles.field}>
              <View style={styles.fieldValueAccount}>
                <Text style={styles.fieldValueTextBold}>Login</Text>
              </View>
              <View style={styles.more} />
            </View>
            <View style={styles.field}>
              <View style={styles.fieldValueAccount}>
                <Text style={styles.fieldValueText}>Login Infomation</Text>
              </View>
              <View style={styles.more}>
                <Icon name="angle-right" size={24} />
              </View>
            </View>
            <View style={styles.field}>
              <View style={styles.fieldValueAccount}>
                <Text style={styles.fieldValueTextLink}>Add more Account</Text>
              </View>
              <View style={styles.more} />
            </View>
            <TouchableOpacity onPress={() => this.logout()}>
              <View style={styles.field}>
                <View style={styles.fieldValueAccount}>
                  <Text style={styles.fieldValueTextLogout}>LOGOUT</Text>
                </View>
                <View style={styles.more} />
              </View>
            </TouchableOpacity>
            <View style={styles.field}>
              <View style={styles.icon}>
                <Icon name="info-circle" size={24} />
              </View>
              <View style={styles.fieldValue}>
                <Text style={styles.fieldValueText}>About Our APP</Text>
              </View>
              <View style={styles.more}>
                <Icon name="angle-right" size={24} />
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
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
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-9%',
  },
  goHome: {
    marginLeft: 0,
  },
  headerTittleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    flex: 0.6,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
  },
  searchBarContainer: {
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
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
  field: {
    flexDirection: 'row',
    marginTop: '5%',
  },
  icon: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldValue: {
    flex: 0.8,
  },
  fieldValueAccount: {
    flex: 0.9,
  },
  fieldValueText: {
    fontSize: 20,
  },
  fieldValueTextBold: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  fieldValueTextLink: {
    fontSize: 18,
    color: 'blue',
    fontStyle: 'italic',
  },
  fieldValueTextLogout: {
    fontSize: 22,
    color: 'red',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  more: {
    marginLeft: '10%',
    flex: 0.1,
  },
  account: {
    flex: 0.35,
    width: '100%',
    paddingLeft: '5%',
  },
});
