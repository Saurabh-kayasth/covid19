import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';

function UserData(props) {
  const navigateToProfile = () => {
    props.navigation.navigate('otherUser', {item: props.item});
  };

  return (
    <TouchableHighlight style={styles.container} onPress={navigateToProfile}>
      <View style={styles.innerContainer}>
        <Image style={styles.profileStyle} source={{uri: props.item.avt}} />
        <View style={styles.dataConatiner}>
          <Text style={styles.name}>{props.item.name}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {props.item.status}
          </Text>
        </View>
        {/* <View style={styles.timeContainer}>
          <Text style={styles.time}>12.59</Text>
        </View> */}
      </View>
    </TouchableHighlight>
  );
}

function UsersComponent(props) {
  // let datasource = [1, 1, 1, 1, 1, 1, 1];
  return (
    <View>
      <FlatList
        data={props.items}
        renderItem={({item, index}) => {
          return <UserData navigation={props.navigation} item={item} />;
        }}
      />
    </View>
  );
}

export default UsersComponent;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#e5e5e5',
  },
  innerContainer: {
    height: 70,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
  profileStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  dataConatiner: {
    width: '78%',
    height: 80,
    paddingLeft: 15,
    paddingTop: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#fff',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.7,
    fontFamily: 'Roboto',
  },
  lastMessage: {
    color: 'gray',
    fontSize: 16,
  },
  time: {
    fontSize: 12,
  },
  timeContainer: {
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
    paddingTop: 15,
  },
});
