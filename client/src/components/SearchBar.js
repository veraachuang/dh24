import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = () => {
    const [search, setSearch] = useState('');

    return (
        <View style={styles.container}>
            <View style ={styles.input_container}>
                <Image
                    source={require('../../assets/search.png')} // Update the path as necessary
                    style={styles.icon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Where to?"
                    placeholderTextColor="#888"      // Grey placeholder text
                    value={search}
                    onChangeText={(text) => setSearch(text)}  // Update the state with the input
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10, // Padding around the search bar
        alignItems: 'center',
    },
    input_container: {
        width: 350,
        height: 60,
        backgroundColor: 'rgba(11,178,67,0.5)',      // Light green background color
        borderRadius: 25,                // Rounded edges (half of height for circle-like edges)
        shadowColor: '#000',             // Shadow color
        shadowOffset: { width: 0, height: 2 },  // Shadow offset (spread and height)
        shadowOpacity: 0.25,             // Shadow opacity
        shadowRadius: 3.84,              // How blurred the shadow is
        paddingVertical: 10,             // Vertical padding inside the input
        paddingHorizontal: 20,           // Horizontal padding inside the input
    },
    searchInput: {
        fontSize: 20,                    // Font size for input text
        color: '#333',                   // Text color for input
        marginLeft: 10,
        flex: 1,
    },
    icon: {
        width: 30,                           // Set width for the icon
        height: 30,                          // Set height for the icon
        marginRight: 10,
    }
});

export default SearchBar;
