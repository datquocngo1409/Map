import React, {Component, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import api from '../service/api';
import AsyncStorage from '@react-native-community/async-storage';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
var radio_props = [
  {label: 'is Passenger', value: 0},
  {label: 'is Driver', value: 1},
];
export default class Register extends Component {
  state: {
    date: string,
    username: string,
    password: string,
    name: string,
    birthDay: string,
    phone: string,
    email: string,
    avatar: string,
    nameHome: string,
    typeHome: string,
    latitudeHome: number,
    longtitudeHome: number,
    nameOffice: string,
    typeOffice: string,
    latitudeOffice: number,
    longtitudeOffice: number,
    isDriver: boolean,
  };
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      filePath: {},
      username: '',
      password: '',
      name: '',
      birthDay: '',
      phone: '',
      email: '',
      avatar: '',
      nameHome: '',
      typeHome: '',
      latitudeHome: 0,
      longtitudeHome: 0,
      nameOffice: '',
      typeOffice: '',
      latitudeOffice: 0,
      longtitudeOffice: 0,
      isDriver: false,
    };
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
  };

  render() {
    return (
      <LinearGradient
        colors={['white', 'orange']}
        start={{x: 0.7, y: 0}}
        end={{x: 1, y: 0.5}}
        style={styles.container}>
        <Animated.ScrollView scrollEventThrottle={1}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="black"
            onChangeText={(name) => this.setState({name})}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="black"
            onChangeText={(username) => this.setState({username})}
          />
          <TextInput
            style={styles.input}
            placeholder="Your password"
            placeholderTextColor="black"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
          />
          <View style={styles.avatarContainer}>
            <View style={styles.buttonAvatar}>
              <TouchableHighlight
                style={styles.buttonAvatarButton}
                onPress={this.chooseFile.bind(this)}>
                <Text>Choose Avatar</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.avatar}>
              <TouchableHighlight
                onPress={this.chooseFile.bind(this)}
                style={styles.containerImage}>
                <View style={styles.containerImage}>
                  <Image
                    source={{
                      uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
                    }}
                    style={{width: 100, height: 100}}
                  />
                  <Image
                    source={{uri: this.state.filePath.uri}}
                    style={{width: 250, height: 250}}
                  />
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <DatePicker
            style={styles.input}
            date={this.state.date}
            mode="date"
            placeholder="Your Birthday"
            format="YYYY-MM-DD"
            minDate="1900-01-01"
            maxDate="2100-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            hidenText={true}
            onDateChange={(date) => {
              this.setState({date: date});
              this.setState({birthDay: date});
            }}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                alignItems: 'flex-start',
              },
              placeholderText: {
                fontSize: 24,
                color: 'black',
              },
              dateText: {
                fontSize: 24,
                color: 'black',
              },
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Address"
            placeholderTextColor="black"
            onChangeText={(nameHome) => this.setState({nameHome})}
          />
          <TextInput
            style={styles.subInput}
            placeholder="Latitude"
            placeholderTextColor="black"
            onChangeText={(latitudeHome) => this.setState({latitudeHome})}
          />
          <TextInput
            style={styles.subInput}
            placeholder="Longtitude"
            placeholderTextColor="black"
            onChangeText={(longtitudeHome) => this.setState({longtitudeHome})}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Office Address"
            placeholderTextColor="black"
            onChangeText={(nameOffice) => this.setState({nameOffice})}
          />
          <TextInput
            style={styles.subInput}
            placeholder="Latitude"
            placeholderTextColor="black"
            onChangeText={(latitudeOffice) => this.setState({latitudeOffice})}
          />
          <TextInput
            style={styles.subInput}
            placeholder="Longtitude"
            placeholderTextColor="black"
            onChangeText={(longtitudeOffice) =>
              this.setState({longtitudeOffice})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Your Phone Number"
            placeholderTextColor="black"
            onChangeText={(phone) => this.setState({phone})}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            placeholderTextColor="black"
            onChangeText={(email) => this.setState({email})}
          />
          <View>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={true}
              buttonColor={'#50C900'}
              animation={true}
              buttonStyle={{marginLeft: 50}}
              onPress={(value) => {
                this.setState({value: value});
                if (value === 1) {
                  this.setState({isDriver: true});
                } else {
                  this.setState({isDriver: false});
                }
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.buttonRed}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttonBlue}
              onPress={() => this.signup()}>
              <Text>Signup</Text>
            </TouchableHighlight>
          </View>
        </Animated.ScrollView>
      </LinearGradient>
    );
  }

  async signup() {
    var user = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      birthDay: this.state.birthDay,
      phone: this.state.phone,
      email: this.state.email,
      avatar: '',
      homeAddress: {
        name: this.state.nameHome,
        location: {
          type: 'GeoPoint',
          latitude: this.state.latitudeHome,
          longtitude: this.state.longtitudeHome,
        },
      },
      officeAddress: {
        name: this.state.nameOffice,
        location: {
          type: 'GeoPoint',
          latitude: this.state.latitudeOffice,
          longtitude: this.state.longtitudeOffice,
        },
      },
      isDriver: this.state.isDriver,
    };
    api.signup(user);
    const isSignUpSuccess = await AsyncStorage.getItem('isSignUpSuccess');
    if (isSignUpSuccess === 'true') {
      alert('Sign Up success, Please login!');
      await AsyncStorage.remove('isSignUpSuccess');
      this.props.navigation.navigate('Login');
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  input: {
    fontSize: 24,
    color: 'black',
    borderBottomColor: 'green',
    borderBottomWidth: 2,
    marginBottom: 30,
    width: (deviceWidth * 80) / 100,
  },
  subInput: {
    fontSize: 24,
    color: 'black',
    borderBottomColor: 'green',
    borderBottomWidth: 2,
    marginBottom: 30,
    width: '60%',
    marginLeft: '35%',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonAvatar: {
    width: '40%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAvatarButton: {
    backgroundColor: '#00b5ec',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 40,
    marginLeft: 5,
  },
  avatar: {
    width: '40%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 50,
  },
  button: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 40,
    marginLeft: 5,
  },
  buttonBlue: {
    backgroundColor: '#00b5ec',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 40,
    marginLeft: 5,
  },
  buttonRed: {
    backgroundColor: 'red',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 40,
    marginLeft: 5,
  },
  containerImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
