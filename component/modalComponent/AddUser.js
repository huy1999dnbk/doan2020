import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Alert, TouchableOpacity, Modal, Text, View, TextInput, FlatList } from 'react-native';
import jwt_decode from "jwt-decode";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Appbutton from '../Appbutton'
import AsyncStorage from '@react-native-community/async-storage';
const AddUser = ({showAddUser}) => {
    
    const [query, setQuery] = useState('');
    const [user, setUser] = useState([]);
    const fetchUser = async () => {
      const tokenID = await AsyncStorage.getItem('idtoken');
      if (query === '') return;
      else if (query !== '') {
        var handledQuery = query.replace(/ /g, '%20');
        await fetch(
          `https://cnpmwarehouse.herokuapp.com/Users/search/${handledQuery}`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${tokenID}`,
            },
          },
        )
          .then((res) => res.json())
          .then((resJson) => {
            setUser(resJson.data.users);
          });
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, [query]);
  
    const updateQuery = (input) => {
      setQuery(input);
    };

    return (
        <View style={styles.ViewCart}>
          <View style={{ marginHorizontal: 10, marginTop: 15 }}>
            <TextInput
              placeholder="Find user here"
              onChangeText={(query) => updateQuery(query)}
              value={query}
              style={styles.input}
            />
          </View>
          <View style={styles.listcart}>
            <FlatList
              data={user}
              numColumns={1}
              extraData={query}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => {
                    Alert.alert('Notice!!!', 'Do you agree to add this user?', [
                      {
                        text: 'Yes',
                        onPress: async () => {
                          console.log("yolooooooooooo")
                        },
                      },
                      { text: 'No', style: 'cancel' },
                    ])
                  }}>
                    <View style={{ height: 60, flexDirection: 'row' }}>
                      <View style={{ alignSelf: 'center', marginRight: '7%' }}>
                        <FontAwesomeIcon
                          style={styles.icondetail}
                          icon={faUserSecret}
                          size={35}
                        />
                      </View>
                      <View>
                        <Text style={styles.text} >Name: {item.name}</Text>
                        <Text style={styles.text} >Phone: {item.phone}</Text>
                        <Text style={styles.text} >Email: {item.email}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      height: 1,
                      width: '100%',
                      backgroundColor: 'black',
                      marginBottom: 20,
                      marginTop: 15
                    }}
                  />
                );
              }}
            />
          </View>
          <View>
            <Appbutton title="oke" onPress={() => showAddUser(false)} />
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
      color: '#FC4646',
      marginLeft: 15
    },
    icondetail: {
      color: '#FC4646',
      marginRight: 25
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
    listcart: {
      height: 300,
      marginHorizontal: 15,
      marginTop: 25,
      marginBottom: 20
    },
    input: {
      fontFamily: 'Roboto-Thin',
      backgroundColor: '#E5E5E5',
      borderRadius: 15
    },
    text: {
      fontFamily: 'Roboto-Medium',
      fontSize: 14
    },
  });

  export default AddUser