import React from 'react';
import { View, Alert, StyleSheet, FlatList, } from 'react-native';
import Appbutton from '../Appbutton'
import AsyncStorage from '@react-native-community/async-storage';
const CartModal = ({addStock,Itemcart,Push,ShowCart }) => {
    return (
        <View style={styles.ViewCart}>
            <View style={styles.listcart}>
                <FlatList
                    data={addStock}
                    numColumns={1}
                    keyExtractor={item => item.name}
                    renderItem={Itemcart}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: 100 }}>
                <Appbutton title="PUSH" onPress={() => {
                    Alert.alert('Notice!!!', 'Are you sure want to do this?', [
                        {
                            text: 'Yes',
                            onPress: async () => {
                                const tokenuser = await AsyncStorage.getItem('idtoken');

                                await fetch(
                                    'https://cnpmwarehouse.herokuapp.com/products',
                                    {
                                        method: 'POST',
                                        headers: {
                                            accept: 'application/json',
                                            Authorization: `Bearer ${tokenuser}`,
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            products: addStock,
                                        }),
                                    },
                                )
                                    .then((res) => res.json())
                                    .then((resdata) => {
                                        if (resdata.statusCode === 200) {
                                            Push();
                                        }
                                    });
                            },
                        },
                        { text: 'No', style: 'cancel' },
                    ]);
                }} />
                <Appbutton title="CANCEL" onPress={() => ShowCart()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        height: 400,
        marginHorizontal: 15,
        marginTop: 15,
      },
});

export default CartModal;
