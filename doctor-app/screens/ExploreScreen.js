import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Search from '../components/home_components/Search/Search';
import SpecialistsRender from '../components/explore_components/SpecialistsRenderExplore';

const ExploreScreen = () => {
  const [query, setQuery] = useState({ limit: 50, search: '' });
  const handleSearch = (search) => {
    if (search?.length > 2) {
      setQuery((state) => ({ ...state, search }));
    } else {
      setQuery({ limit: 50 });
    }
  };

  return (
    <View style={Styles.container}>
      <Search onSearch={handleSearch} />
      <SpecialistsRender query={query} setQuery={setQuery} />
    </View>
  );
};

export default ExploreScreen;
const Styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Use flexGrow instead of flex to ensure the ScrollView fills the screen
    backgroundColor: '#F9F9F9',
  },
});
