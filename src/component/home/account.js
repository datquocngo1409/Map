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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../service/api';
import {IUser} from '../../data/user';
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import {IGeoPoint} from '../../data/geopoint';
import {ILocation} from '../../data/location';

export default class Account extends Component {
  state = {
    user: IUser,
    homeAddress: IGeoPoint,
    officeAddress: IGeoPoint,
    homeLocation: ILocation,
    officeLocation: ILocation,
  };
  constructor(props) {
    super(props);
    this.getUser();
  }

  async getUser() {
    const token = await AsyncStorage.getItem('token');
    api.getUserByToken(token);
    const userString = await AsyncStorage.getItem('user');
    const user = JSON.parse(userString);
    this.setState({user: user});
    const homeAddress = JSON.parse(JSON.stringify(user.homeAddress));
    this.setState({homeAddress: homeAddress});
    const homeLocation = JSON.parse(JSON.stringify(homeAddress.location));
    this.setState({homeLocation: homeLocation});
    const officeAddress = JSON.parse(JSON.stringify(user.officeAddress));
    this.setState({officeAddress: officeAddress});
    const officeLocation = JSON.parse(JSON.stringify(officeAddress.location));
    this.setState({officeLocation: officeLocation});
  }

  goHome() {
    this.props.navigation.navigate('Home');
  }

  async submit() {
    const token = await AsyncStorage.getItem('token');
    api.updateAccount(token, this.state.user);
    if ((await AsyncStorage.getItem('updateAccountSuccess')) === 'true') {
      alert('Updated Account!');
      await AsyncStorage.setItem('updateAccountSuccess', 'false');
      this.props.navigation.navigate('Home');
    }
  }

  changeName(name) {
    const user = this.state.user;
    user.name = name;
    this.setState({user: user});
  }

  changeBirthDay(date) {
    const user = this.state.user;
    user.birthDay = date;
    this.setState({user: user});
  }

  changePhone(phone) {
    const user = this.state.user;
    user.phone = phone;
    this.setState({user: user});
  }

  changeEmail(email) {
    const user = this.state.user;
    user.email = email;
    this.setState({user: user});
  }

  changeHomeAddress(name) {
    const homeAddress = this.state.homeAddress;
    homeAddress.name = name;
    this.setState({homeAddress: homeAddress});
    const user = this.state.user;
    user.homeAddress = homeAddress;
    this.setState({user: user});
  }

  changeHomeLatitude(latitude) {
    const homeAddress = this.state.homeAddress;
    homeAddress.latitude = latitude.toString();
    this.setState({homeAddress: homeAddress});
    const user = this.state.user;
    user.homeAddress = homeAddress;
    this.setState({user: user});
  }

  changeHomeLongtitude(longtitude) {
    const homeAddress = this.state.homeAddress;
    homeAddress.longtitude = longtitude;
    this.setState({homeAddress: homeAddress});
    const user = this.state.user;
    user.homeAddress = homeAddress;
    this.setState({user: user});
  }

  changeOfficeAddress(name) {
    const officeAddress = this.state.officeAddress;
    officeAddress.name = name;
    this.setState({officeAddress: officeAddress});
    const user = this.state.user;
    user.officeAddress = officeAddress;
    this.setState({user: user});
  }

  changeOfficeLatitude(latitude) {
    const officeAddress = this.state.officeAddress;
    officeAddress.latitude = latitude;
    this.setState({officeAddress: officeAddress});
    const user = this.state.user;
    user.officeAddress = officeAddress;
    this.setState({user: user});
  }

  changeOfficeLongtitude(longtitude) {
    const officeAddress = this.state.officeAddress;
    officeAddress.longtitude = longtitude;
    this.setState({officeAddress: officeAddress});
    const user = this.state.user;
    user.officeAddress = officeAddress;
    this.setState({user: user});
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
        colors={['white', '#0A9BFA']}
        start={{x: 0.5, y: 0}}
        end={{x: 1, y: 0.9}}
        style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
            style={styles.cancel}
            onPress={() => this.goHome()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableHighlight>
          <View style={styles.headerTittle}>
            <Text style={styles.headerTittleText}>EDIT YOUR PROFILE</Text>
          </View>
          <TouchableHighlight
            style={styles.submit}
            onPress={() => this.submit()}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          <View style={styles.topContent}>
            <View style={styles.containerImage}>
              <Image
                source={{
                  uri: 'data:image/jpeg;base64,',
                }}
                style={{width: 100, height: 100}}
              />
              <Image style={{width: 250, height: 250}} />
            </View>
            <TouchableHighlight onPress={this.chooseFile.bind(this)}>
              <View style={styles.buttonChangeAvatar}>
                <Text style={styles.buttonChangeAvatarText}>
                  Change your avatar
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.bottomContent}>
            {/*Name*/}
            <View style={styles.field}>
              <View style={styles.fieldName}>
                <Text style={styles.field}>Name: </Text>
              </View>
              <View style={styles.fieldValue}>
                <TextInput
                  style={styles.fieldValueInput}
                  value={this.state.user.name}
                  placeholderTextColor="black"
                  onChangeText={(name) => this.changeName(name)}
                />
              </View>
            </View>
            {/*Username*/}
            <View style={styles.field}>
              <View style={styles.fieldName}>
                <Text style={styles.field}>Username: </Text>
              </View>
              <View style={styles.fieldValue}>
                <TextInput
                  style={styles.fieldValueInput}
                  value={this.state.user.username}
                  placeholderTextColor="black"
                  editable={false}
                />
              </View>
            </View>
            {/*Birth Day*/}
            <View style={styles.field}>
              <View style={styles.fieldName}>
                <Text style={styles.field}>Birth Day: </Text>
              </View>
              <View style={styles.fieldValue}>
                <DatePicker
                  style={styles.input}
                  mode="date"
                  date={this.state.user.birthDay}
                  format="YYYY-MM-DD"
                  minDate="1900-01-01"
                  maxDate="2100-01-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  hidenText={true}
                  onDateChange={(date) => {
                    this.changeBirthDay(date);
                  }}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                    },
                  }}
                />
              </View>
            </View>
            {/*Phone*/}
            <View style={styles.field}>
              <View style={styles.fieldName}>
                <Text style={styles.field}>Phone Number: </Text>
              </View>
              <View style={styles.fieldValue}>
                <TextInput
                  style={styles.fieldValueInput}
                  value={this.state.user.phone}
                  placeholderTextColor="black"
                  onChangeText={(phone) => this.changePhone(phone)}
                />
              </View>
            </View>
            {/*Phone*/}
            <View style={styles.field}>
              <View style={styles.fieldName}>
                <Text style={styles.field}>Email: </Text>
              </View>
              <View style={styles.fieldValue}>
                <TextInput
                  style={styles.fieldValueInput}
                  value={this.state.user.email}
                  placeholderTextColor="black"
                  onChangeText={(email) => this.changeEmail(email)}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.moreContent}>
          {/*Home Address Name*/}
          <View style={styles.field}>
            <View style={styles.fieldName}>
              <Text style={styles.field}>Home Address: </Text>
            </View>
            <View style={styles.fieldValue}>
              <TextInput
                style={styles.fieldValueInput}
                value={this.state.homeAddress.name}
                placeholderTextColor="black"
                onChangeText={(homeAddress) =>
                  this.changeHomeAddress(homeAddress)
                }
              />
            </View>
          </View>
          <View style={styles.subfieldContainer}>
            <View style={styles.subfield}>
              {/*Home Address Latitude*/}
              <View style={styles.field}>
                <View style={styles.fieldName}>
                  <Text style={styles.field}>Latitude: </Text>
                </View>
                <View style={styles.fieldValue}>
                  <TextInput
                    style={styles.fieldValueInput}
                    value={String(this.state.homeLocation.latitude)}
                    placeholderTextColor="black"
                    onChangeText={(latitude) =>
                      this.changeHomeLatitude(latitude)
                    }
                  />
                </View>
              </View>
            </View>
            <View style={styles.subfield}>
              {/*Home Address Latitude*/}
              <View style={styles.field}>
                <View style={styles.fieldName}>
                  <Text style={styles.field}>Longtitude: </Text>
                </View>
                <View style={styles.fieldValue}>
                  <TextInput
                    style={styles.fieldValueInput}
                    value={String(this.state.homeLocation.longtitude)}
                    placeholderTextColor="black"
                    onChangeText={(longtitude) =>
                      this.changeHomeLongtitude(longtitude)
                    }
                  />
                </View>
              </View>
            </View>
          </View>
          {/*Office Address Name*/}
          <View style={styles.field}>
            <View style={styles.fieldName}>
              <Text style={styles.field}>Office Address: </Text>
            </View>
            <View style={styles.fieldValue}>
              <TextInput
                style={styles.fieldValueInput}
                value={this.state.officeAddress.name}
                placeholderTextColor="black"
                onChangeText={(officeAddress) =>
                  this.changeOfficeAddress(officeAddress)
                }
              />
            </View>
          </View>
          <View style={styles.subfieldContainer}>
            <View style={styles.subfield}>
              {/*Office Address Latitude*/}
              <View style={styles.field}>
                <View style={styles.fieldName}>
                  <Text style={styles.field}>Latitude: </Text>
                </View>
                <View style={styles.fieldValue}>
                  <TextInput
                    style={styles.fieldValueInput}
                    value={String(this.state.officeLocation.latitude)}
                    placeholderTextColor="black"
                    onChangeText={(latitude) =>
                      this.changeOfficeLatitude(latitude)
                    }
                  />
                </View>
              </View>
            </View>
            <View style={styles.subfield}>
              {/*Office Address Longtitude*/}
              <View style={styles.field}>
                <View style={styles.fieldName}>
                  <Text style={styles.field}>Longtitude: </Text>
                </View>
                <View style={styles.fieldValue}>
                  <TextInput
                    style={styles.fieldValueInput}
                    value={String(this.state.officeLocation.longtitude)}
                    placeholderTextColor="black"
                    onChangeText={(longtitude) =>
                      this.changeOfficeLongtitude(longtitude)
                    }
                  />
                </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cancel: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTittle: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTittleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  submit: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 0.6,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
  },
  topContent: {
    flex: 0.35,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContent: {
    flex: 0.65,
    width: '100%',
  },
  moreContent: {
    flex: 0.35,
    width: '100%',
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
  buttonChangeAvatarText: {
    color: 'green',
    fontSize: 16,
    fontWeight: '300',
  },
  field: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '3%',
  },
  fieldName: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  fieldValue: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#000',
  },
  fieldValueInput: {},
  subfieldContainer: {
    flexDirection: 'row',
    marginBottom: '10%',
  },
  subfield: {
    width: '50%',
  },
});
