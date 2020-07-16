import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const logo =
  'https://firebasestorage.googleapis.com/v0/b/covid19-5a2e1.appspot.com/o/Assets%2Flogo.png?alt=media&token=99e880a2-582a-4ed9-8433-852f7bc65ea4';

function HeaderComponent(props) {
  const goToPhoneBook = () => {
    props.navigation.navigate('phoneBook');
  };

  return (
    <View style={styles.header}>
      <View style={{flexDirection: 'row'}}>
        <Image source={{uri: logo}} style={styles.logo} />
        <Text style={styles.headerText}>{props.header}</Text>
      </View>
      {props.header == 'Home' ? (
        <TouchableOpacity onPress={goToPhoneBook} style={styles.btn}>
          <Icon name="phone" size={25} color="#fff" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default HeaderComponent;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    elevation: 10,
  },
  logo: {
    height: 35,
    width: 35,
    marginRight: 10,
  },
  headerText: {
    fontSize: 25,
    color: '#48bb78',
    fontWeight: 'bold',
  },
  btn: {
    height: 40,
    width: 40,
    backgroundColor: '#48bb78',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});
