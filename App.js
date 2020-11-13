import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, Alert, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Loginscreen from './screens/Loginscreen';
import Mainscreen from './screens/Mainscreen';
import Signupscreen from './screens/Signupscreen';
import Detailscreen from './screens/Detailscreen';
import {token} from './screens/Loginscreen';
import AsyncStorage from '@react-native-community/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({...props}) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign out"
        onPress={() =>
          Alert.alert('Notice!!!', 'You want to sign out?', [
            {
              text: 'Yes',
              onPress: async () => {
                await AsyncStorage.removeItem('idtoken');
                props.navigation.navigate('Login');
              },
            },
            {text: 'No', style: 'cancel'},
          ])
        }
      />
    </DrawerContentScrollView>
  );
}

const MainRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Mainscreen}
        options={({navigation}) => ({
          headerLeft: (props) => {
            return (
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faBars}
                  size={25}
                />
              </TouchableOpacity>
            );
          },
          title: 'Warehouse Management',
        })}
      />
      <Stack.Screen name="Detail" component={Detailscreen} />
    </Stack.Navigator>
  );
};

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Main" component={MainRoutes} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Loginscreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signupscreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={DrawerRoutes}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: '#FC4646',
    marginLeft:15
  },
});

export default App;
