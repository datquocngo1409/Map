import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert, Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import {Marker, Polyline, AnimatedRegion} from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import NewFamily from '../communication/new-family';
import Detail from './detail';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class MapHome extends Component {
  state = {
    markers: [
      {
        id: 1,
        title: 'Đại Học Tài Chính Ngân Hàng Hà Nội',
        coordinates: {
          latitude: 21.075849,
          longitude: 105.785628,
        },
        isHome: true,
      },
      {
        id: 2,
        title: 'Trần Cung',
        coordinates: {
          latitude: 21.058404,
          longitude: 105.783324,
        },
        isHome: true,
      },
      {
        id: 3,
        title: 'Đại học Quốc gia Hà Nội',
        coordinates: {
          latitude: 21.037224,
          longitude: 105.781412,
        },
        isHome: false,
      },
      {
        id: 4,
        title: '18 húc Thừa Dụ',
        coordinates: {
          latitude: 21.034397,
          longitude: 105.792849,
        },
        isHome: true,
      },
      {
        id: 5,
        title: '1 Nguyễn Khang',
        coordinates: {
          latitude: 21.030317,
          longitude: 105.800929,
        },
        isHome: false,
      },
      {
        id: 6,
        title: '400 Nguyễn Khang',
        coordinates: {
          latitude: 21.026881,
          longitude: 105.798003,
        },
        isHome: false,
      },
    ],
    polyline: [],
  };

  constructor(props) {
    super(props);
    this.getPolyline();
  }

  getPolyline() {
    for (let i = 0; i < this.state.markers.length - 1; i++) {
      const first = {
        latitude: this.state.markers[i].coordinates.latitude,
        longitude: this.state.markers[i].coordinates.longitude,
      };
      const last = {
        latitude: this.state.markers[i + 1].coordinates.latitude,
        longitude: this.state.markers[i + 1].coordinates.longitude,
      };
      const polyline = {startLocation: first, endLocation: last};
      this.state.polyline.push(polyline);
    }
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
              latitude: this.state.markers[0].coordinates.latitude,
              longitude: this.state.markers[0].coordinates.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}>
            {this.state.markers.map((marker) => (
              <MapView.Marker
                coordinate={marker.coordinates}
                title={marker.title}
                pinColor={marker.isHome ? 'red' : 'green'}
              />
            ))}
            {this.state.polyline.map((polyline) => (
              <Polyline
                coordinates={[
                  {
                    latitude: polyline.startLocation.latitude,
                    longitude: polyline.startLocation.longitude,
                  },
                  {
                    latitude: polyline.endLocation.latitude,
                    longitude: polyline.endLocation.longitude,
                  },
                ]}
                strokeColor="#25A1EC"
                strokeWidth={5}
              />
            ))}
          </MapView>
          <View
            style={{
              position: 'absolute', //use absolute position to show button on top of the map
              bottom: '0%', //for center align
              alignSelf: 'center',
            }}>
            <TouchableHighlight style={{}} onPress={() => this.RBSheet.open()}>
              <Icon name="caret-up" size={50} color={'#5A2014'} />
            </TouchableHighlight>
            <RBSheet
              ref={(ref) => {
                this.RBSheet = ref;
              }}
              height={deviceHeight * 0.4}
              openDuration={deviceWidth}
              customStyles={{
                container: {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              }}>
              <Detail />
            </RBSheet>
          </View>
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
