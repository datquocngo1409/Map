import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class Detail extends Component {
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
        title: this.state.markers[i].title,
        latitude: this.state.markers[i].coordinates.latitude,
        longitude: this.state.markers[i].coordinates.longitude,
      };
      const last = {
        title: this.state.markers[i + 1].title,
        latitude: this.state.markers[i + 1].coordinates.latitude,
        longitude: this.state.markers[i + 1].coordinates.longitude,
      };
      const polyline = {startLocation: first, endLocation: last};
      this.state.polyline.push(polyline);
    }
  }

  getHaversineDistance = (firstLocation, secondLocation) => {
    const earthRadius = 6371; // km
    const diffLat =
      ((secondLocation.latitude - firstLocation.latitude) * Math.PI) / 180;
    const diffLng =
      ((secondLocation.longitude - firstLocation.longitude) * Math.PI) / 180;

    const arc =
      Math.cos((firstLocation.latitude * Math.PI) / 180) *
        Math.cos((secondLocation.latitude * Math.PI) / 180) *
        Math.sin(diffLng / 2) *
        Math.sin(diffLng / 2) +
      Math.sin(diffLat / 2) * Math.sin(diffLat / 2);
    const line = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc));
    const distance = earthRadius * line;
    return Math.round(distance * 100) / 100;
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.state.polyline.map((polyline) => (
            <View style={styles.component}>
              <View style={styles.location}>
                <View style={styles.startLocation}>
                  <Text>{polyline.startLocation.title}</Text>
                </View>
                <Icon name="arrow-down" size={20} color={'#5A2014'} />
                <View style={styles.endLocation}>
                  <Text>{polyline.endLocation.title}</Text>
                </View>
              </View>
              <View style={styles.distance}>
                <Text>
                  {this.getHaversineDistance(
                    polyline.startLocation,
                    polyline.endLocation,
                  )}{' '}
                  (km)
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {},
  component: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2%',
    marginTop: '2%',
  },
  location: {
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    marginRight: '2%',
  },
  distance: {
    width: deviceWidth * 0.2,
    height: deviceHeight * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#EF6115',
  },
  startLocation: {
    flexDirection: 'row',
  },
  endLocation: {
    flexDirection: 'row',
  },
});
