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
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import {IUser} from '../../data/user';
import {IGeoPoint} from '../../data/geopoint';
import {ILocation} from '../../data/location';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../service/api';
import {Marker, Polyline, AnimatedRegion} from 'react-native-maps';

export default class MapHome extends Component {
  state = {
    user: IUser,
    homeAddress: IGeoPoint,
    officeAddress: IGeoPoint,
    homeLocation: ILocation,
    officeLocation: ILocation,
    marker: [],
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
    this.setState({
      marker: [
        ...this.state.marker,
        {
          latitude: homeLocation.latitude,
          longtitude: homeLocation.longtitude,
        },
        {
          latitude: officeLocation.latitude,
          longtitude: officeLocation.longtitude,
        },
      ],
    });
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
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="angle-left" size={30} color={'#5A2014'} />
            </TouchableHighlight>
          </View>
          <View style={styles.tittleContainer}>
            <Text style={styles.headerTittleText}>MAP</Text>
          </View>
        </View>
        <View style={styles.map}>
          <MapView
            style={styles.mapShow}
            initialRegion={{
              latitude: this.state.homeLocation.latitude,
              longitude: this.state.homeLocation.longtitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}>
            {this.state.marker.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longtitude,
                  }}
                  title={'Home'}
                  description={'Desciption'}
                />
              );
            })}
            <Polyline
              coordinates={[
                {
                  latitude: this.state.homeLocation.latitude,
                  longitude: this.state.homeLocation.longtitude,
                },
                {
                  latitude: this.state.officeLocation.latitude,
                  longitude: this.state.officeLocation.longtitude,
                },
              ]}
              strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={1}
            />
          </MapView>
        </View>
      </LinearGradient>
    );
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
  map: {
    flex: 0.95,
  },
  mapShow: {
    flex: 1,
  },
});
