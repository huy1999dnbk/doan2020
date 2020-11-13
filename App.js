import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Alert, TouchableOpacity, Modal, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
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
import { token } from './screens/Loginscreen';
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Appbutton from './component/Appbutton';
import jwt_decode from "jwt-decode";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ ...props }) {
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
            { text: 'No', style: 'cancel' },
          ])
        }
      />
    </DrawerContentScrollView>
  );
}

const MainRoutes = () => {
  const [adduser, setAddUser] = useState(false);
  const checkToken =  async () => {
    const tokenuser = await AsyncStorage.getItem('idtoken');
    var decoded = jwt_decode(tokenuser);
    console.log(decoded);
    if (decoded.permissionIds[0].permission == 'CHIEF_EMPLOYEE') {
      setAddUser(true);
    }
  };
  checkToken();
  const ADD_USER = () => {
    return adduser ? (
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <FontAwesomeIcon
          style={styles.icondetail}
          icon={faUserPlus}
          size={25}
        />
      </TouchableOpacity>
    ) : null;
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal visible={showModal} transparent={true} animationType="none">
        <View style={styles.ViewCart}>
          <Text>Hello world</Text>
          <View>
            <Appbutton title="oke" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Mainscreen}
          options={({ navigation }) => ({
            headerLeft: () => {
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
        <Stack.Screen
          name="Detail"
          component={Detailscreen}
          options={() => ({
            headerRight: () => {ADD_USER},
          })}
        />
      </Stack.Navigator>
    </>
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signupscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={DrawerRoutes}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: '#FC4646',
    marginLeft: 15
  },
  icondetail: {
    color: '#FC4646',
    marginRight: 15
  },
  ViewCart: {
    alignSelf: 'center',
    marginTop: 200,
    width: 400,
    height: 500,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
  },
});

export default App;
