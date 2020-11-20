import React from 'react';
import { View, TextInput, StyleSheet, FlatList,Alert } from 'react-native';
import Appbutton from '../Appbutton'
import Searchproduct from '../Searchproduct'
const SearchModal = ({ updateQuery,add_search,idwarehouse,separate,handleCart,handlejoinarray,ShowAdd,query,product }) => {
    return (
        <View style={styles.addproduct}>
            <View style={{ marginHorizontal: 15, marginBottom: 40 }}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Find product here"
                    onChangeText={(query) => updateQuery(query)}
                    value={query}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={product}
                    numColumns={1}
                    extraData={query}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Searchproduct name={item.name} add_search={add_search} idwarehouse={idwarehouse} />}
                    ItemSeparatorComponent={separate}
                />
            </View>
            <View style={{ marginHorizontal: 50, marginTop: 40 }}>
                <Appbutton title="ADD TO CART" onPress={() => {
                    Alert.alert('notification', 'The changes you make will be lost, are you sure about this?', [
                        {
                            text: 'Yes',
                            onPress: () => {
                                //console.log('addSearch sau khi search' + searchProduct);
                                handleCart();
                                //console.log(addStock);
                            }
                        },
                        {
                            text: 'No',
                            style: 'cancel'
                        }
                    ])
                }} />
            </View>
            <View style={{ marginHorizontal: 50, marginTop: 40 }}>
                <Appbutton title="OK" onPress={() => {
                    handlejoinarray();
                    ShowAdd();
                    //console.log('addStock sau khi nhan nut oke' + addStock);
                }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
        borderColor: 'black',
        borderWidth: 1,
    },
    addproduct: {
        justifyContent: 'center',
        width: '100%',
        height: 900,
        backgroundColor: '#fff',
        borderRadius: 25,
        elevation: 20,
        zIndex: 1,
        marginBottom: 30
    },
    searchInput: {
        fontFamily: 'Roboto-Black',
        backgroundColor: '#E5E5E5',
        borderRadius: 15
    },
});

export default SearchModal;
