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

export default class ListGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LinearGradient
        colors={['white', '#0A9BFA']}
        start={{x: 0.5, y: 0}}
        end={{x: 1, y: 0.9}}
        style={styles.container}>
        <Text>List Group</Text>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.navigate('Group')}>
          <Icon name="sign-out" size={30} color={'#5A2014'} />
        </TouchableHighlight>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
