import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/component/login';
import Home from './src/component/home';
import {navigationRef} from './src/navigation/root-navigation';
import Register from './src/component/register';
import Account from './src/component/home/account';
import Driver from './src/component/home/driver';
import Friend from './src/component/home/communication/friend';
import Group from './src/component/home/group';
import MapHome from './src/component/home/map';
import Setting from './src/component/home/setting';
import Communication from './src/component/home/communication';
import Family from './src/component/home/communication/family';
import Colleague from './src/component/home/communication/colleague';
import ListGroup from './src/component/home/group/list-group';
import NewGroup from './src/component/home/group/new-group';
import YourGroup from './src/component/home/group/your-group';
import OldGroup from './src/component/home/group/old-group';
import NewFriend from './src/component/home/communication/new-friend';
import NewFamily from './src/component/home/communication/new-family';
import NewColleague from './src/component/home/communication/new-colleague';

const Stack = createStackNavigator();
const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Driver"
            component={Driver}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Friend"
            component={Friend}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Family"
            component={Family}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Colleague"
            component={Colleague}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="NewFriend"
            component={NewFriend}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="NewFamily"
            component={NewFamily}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="NewColleague"
            component={NewColleague}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Group"
            component={Group}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MapHome"
            component={MapHome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Communication"
            component={Communication}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ListGroup"
            component={ListGroup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="NewGroup"
            component={NewGroup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="YourGroup"
            component={YourGroup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OldGroup"
            component={OldGroup}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
});
export default App;
