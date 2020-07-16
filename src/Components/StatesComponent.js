import React from 'react';
import {View, StyleSheet, Dimensions, FlatList, Text} from 'react-native';
import {secondarColor} from '../Constants/Theme';

const {width, height} = Dimensions.get('window');

function StatesComponent(props) {
  console.log(props.data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.heading, {fontWeight: 'bold', fontSize: 14}]}>
          State
        </Text>
        <Text style={[styles.heading, {fontWeight: 'bold', fontSize: 14}]}>
          Confirmed
        </Text>
        <Text style={[styles.heading, {fontWeight: 'bold', fontSize: 14}]}>
          Recovered
        </Text>
        <Text style={[styles.heading, {fontWeight: 'bold', fontSize: 14}]}>
          Deceased
        </Text>
      </View>
      <FlatList
        data={props.data}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                styles.header,
                {backgroundColor: index % 2 == 0 ? '#fff' : '#daf1e4'},
              ]}>
              <Text
                style={[
                  styles.heading,
                  {color: '#000', textAlign: 'left', marginLeft: 10},
                ]}>
                {item.state}
              </Text>
              <Text style={[styles.heading, {color: '#000'}]}>
                {item.confirmed}
              </Text>
              <Text style={[styles.heading, {color: '#000'}]}>
                {item.recovered}
              </Text>
              <Text style={[styles.heading, {color: '#000'}]}>
                {item.deaths}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
export default StatesComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: secondarColor,
    height: 40,
    alignItems: 'center',
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
  },
  heading: {
    color: '#fff',
    width: '25%',
    textAlign: 'center',
    fontSize: 12,
    // fontWeight: 'bold',
  },
});
