import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = () => {
    const [search, setSearch] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Where to?"
                placeholderTextColor="#888"      // Grey placeholder text
                value={search}
                onChangeText={(text) => setSearch(text)}  // Update the state with the input
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,                     // Padding around the search bar
    },
    searchInput: {
        width: 350,
        height: 60,
        backgroundColor: 'rgba(11,178,67,0.5)',      // Light green background color
        borderRadius: 25,                // Rounded edges (half of height for circle-like edges)
        paddingVertical: 10,             // Vertical padding inside the input
        paddingHorizontal: 20,           // Horizontal padding inside the input
        fontSize: 20,                    // Font size for input text
        color: '#333',                   // Text color for input
        shadowColor: '#000',             // Shadow color
        shadowOffset: { width: 0, height: 2 },  // Shadow offset (spread and height)
        shadowOpacity: 0.25,             // Shadow opacity
        shadowRadius: 3.84,              // How blurred the shadow is
    },
});

export default SearchBar;
