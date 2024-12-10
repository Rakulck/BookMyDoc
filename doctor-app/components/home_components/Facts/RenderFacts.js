import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useGetFactsQuery, appRefreshSelector } from './../../../store';
import Global_Styles from '../../../utils/Global_Styles';

const windowWidth = Dimensions.get('window').width;

const RenderFacts = () => {
  const appRefresh = useSelector(appRefreshSelector);
  const { data, isLoading } = useGetFactsQuery({
    seed: true,
    refresh: appRefresh,
  });

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.fact}>{item.fact}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={{ justifyContent: 'center' }}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  }

  return (
    <FlatList
      data={data ?? []}
      renderItem={renderItem}
      keyExtractor={(item) => item?.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    // backgroundColor: '#f9c2ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 30,
    borderRadius: Global_Styles.BorderRadius,
    width: windowWidth - 80,
    backgroundColor: '#2CAAFF',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 5,
  },
  fact: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
    color: 'white',
  },
});

export default RenderFacts;
