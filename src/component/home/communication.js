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
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../service/api';

export default class Communication extends Component {
  constructor(props) {
    super(props);
    this.getVariable();
  }

  async getVariable() {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    api.getFriends(token, userId);
    api.getFamilyMembers(token, userId);
    api.getColleagues(token, userId);
    api.getRecommendFriends(token, userId);
    api.getRecommendFamilyMembers(token, userId);
    api.getRecommendColleagues(token, userId);
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
            <Text style={styles.headerTittleText}>COMMUNICATION</Text>
          </View>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Family')}>
            <LinearGradient
              colors={['orange', 'white']}
              start={{x: 0.1, y: 0.2}}
              end={{x: 1, y: 1}}
              style={styles.box}>
              <View style={styles.cardContent}>
                <Text style={styles.titleContent}>FAMILY</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Friend')}>
            <LinearGradient
              colors={['orange', 'white']}
              start={{x: 0.1, y: 0.2}}
              end={{x: 1, y: 1}}
              style={styles.box}>
              <View style={styles.cardContent}>
                <Text style={styles.titleContent}>FRIEND</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Colleague')}>
            <LinearGradient
              colors={['orange', 'white']}
              start={{x: 0.1, y: 0.2}}
              end={{x: 1, y: 1}}
              style={styles.box}>
              <View style={styles.cardContent}>
                <Text style={styles.titleContent}>COLLEAGUE</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity>
            <LinearGradient
              colors={['orange', 'white']}
              start={{x: 0.1, y: 0.2}}
              end={{x: 1, y: 1}}
              style={styles.box}>
              <View style={styles.cardContent}>
                <Text style={styles.titleContent}>NEIGHBOR</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
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
  content: {
    flex: 0.95,
  },
  box: {
    padding: 5,
    marginTop: 40,
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
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContent: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5381E9',
  },
});
