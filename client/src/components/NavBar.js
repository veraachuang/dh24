import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Choose the icon set you prefer

const NavBar = ({ onPressHome, onPressWater, onPressProfile }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPressHome}>
                <Icon name="home" size={30} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onPressWater}>
                <Icon name="search" size={30} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onPressProfile}>
                <Icon name="person" size={30} color="#333" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        padding: 10,
    },
    button: {
        flex: 1.5,
        alignItems: 'center',
    },
});

export default NavBar;
