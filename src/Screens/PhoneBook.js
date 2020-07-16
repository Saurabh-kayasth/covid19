import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, FlatList, View, Text} from 'react-native';
// import Header from './Header';
import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
import HeaderComponent from '../Components/HeaderComponent';

class PhoneBook extends Component {
  constructor(props) {
    super(props);
  }

  makeCall = number => {
    Communications.phonecall(number, true);
  };

  render() {
    let call_list = [
      {
        name: 'NATIONAL EMERGENCY NUMBER',
        number: '112',
      },
      {
        name: 'POLICE',
        number: '100',
      },
      {
        name: 'FIRE',
        number: '101',
      },
      {
        name: 'AMBULANCE',
        number: '102',
      },
      {
        name: 'Disaster Management Services',
        number: '108',
      },
      {
        name: 'Women Helpline',
        number: '1091',
      },
      {
        name: 'EARTHQUAKE / FLOOD / DISASTER N.D.R.F',
        number: '011-24363260',
      },
      {
        name: 'Railway Accident Emergency Service',
        number: '1072',
      },
      {
        name: 'Road Accident Emergency Service',
        number: '1073',
      },
      {
        name:
          'Road Accident Emergency Service On National Highway For Private Operators',
        number: '1033',
      },
      {
        name: 'LPG Leak Helpline',
        number: '1906',
      },
    ];
    return (
      <View style={styles.container}>
        {/* <Header iconName={null} headerTitle="      Emergency Call List" /> */}
        <HeaderComponent header={'Emergency Call List'} />
        <FlatList
          data={call_list}
          renderItem={({item, index}) => {
            return (
              <View style={styles.callContainer}>
                <View style={[styles.name, {backgroundColor: '#fff'}]}>
                  <View style={styles.iconContainer}>
                    <Icon name="ios-call" size={25} color="#fff" />
                  </View>
                  <View style={styles.nameText}>
                    <View>
                      <Text style={{fontSize: 13, color: 'gray'}}>
                        {item.name}
                      </Text>
                      <Text style={{fontSize: 18, color: '#000'}}>
                        {item.number}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.iconContainer2}
                    onPress={() => {
                      this.makeCall(item.number);
                    }}>
                    <Icon name="ios-call" size={25} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.divider} />
              </View>
            );
          }}
        />
      </View>
    );
  }
}

export default PhoneBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  callContainer: {
    width: '100%',
  },
  name: {
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: 15,
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  divider: {
    height: 0.4,
    backgroundColor: 'gray',
  },
  nameText: {
    width: '72%',
    marginRight: 10,
  },
  iconContainer2: {
    backgroundColor: '#33CC66',
    marginRight: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
