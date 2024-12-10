import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  return (
    <View style={homeStyles.search_container}>
      <Ionicons name="search" size={24} color="#979797" />
      <TextInput
        placeholder="Search by name or specialties"
        placeholderTextColor="#979797"
        style={{ flex: 1, marginHorizontal: 5 }}
        name="search"
        value={search}
        onChangeText={(value) => {
          setSearch(value);
        }}
        onSubmitEditing={() => {
          onSearch(search);
        }}
      />
      <TouchableOpacity
        style={homeStyles.filter_container}
        onPress={() => onSearch(search)}
      >
        <Ionicons name="filter" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const homeStyles = StyleSheet.create({
  search_container: {
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  filter_container: {
    padding: '3%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#18A0FB',
  },
});
