/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
  Picker,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {secondarColor} from '../Constants/Theme';
const axios = require('react-native-axios');
const {width} = Dimensions.get('window');
const mask =
  'https://firebasestorage.googleapis.com/v0/b/covid19-5a2e1.appspot.com/o/Assets%2Fmask.png?alt=media&token=b768dba5-67d3-4537-89c8-69e51a9ec0fd';
function CaseComponent(props) {
  const [currentCountry, setCurrentCountry] = useState('India');
  const [done, setDone] = useState(false);
  const [confirmed, setConfirmed] = useState();
  const [recovered, setRecovered] = useState();
  const [deaths, setDeaths] = useState();
  const [lastUpdate, setLastUpdate] = useState();

  useEffect(() => {
    fetchCountryData('India');
  }, []);

  const fetchCountryData = country => {
    setDone(false);
    setCurrentCountry(country);
    axios({
      method: 'GET',
      url: 'https://covid19.mathdro.id/api/countries/' + country,
    })
      .then(response => {
        var lastupdate = response.data.lastUpdate.replace('T', '  ');
        lastupdate = lastupdate.replace('.000Z', '');
        // this.setState({
        setConfirmed(response.data.confirmed.value);
        setRecovered(response.data.recovered.value);
        setDeaths(response.data.deaths.value);
        setLastUpdate(lastupdate);
        setDone(true);
        // });
        console.log(response.data.lastUpdate);
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log(props.countries);
  return (
    <ImageBackground
      blurRadius={480}
      style={styles.container}
      source={{uri: mask}}>
      {/* <Text style={styles.heading}>Maharashtra</Text>
       */}
      <View style={styles.picker}>
        <Picker
          selectedValue={currentCountry}
          style={{
            height: 40,
            width: '90%',
            color: '#fff',
          }}
          onValueChange={(itemValue, itemIndex) => fetchCountryData(itemValue)}>
          {props.countries.map(country => (
            <Picker.Item label={country} value={country} />
          ))}
        </Picker>
      </View>
      <View style={styles.dataTable}>
        <View style={styles.dataValue}>
          <Text style={styles.dataHeading}>Confirmed</Text>
          <Text style={[styles.dataNumber, {color: '#ff0000'}]}>
            {confirmed}
          </Text>
          {/* <View style={styles.changes}>
            <Icon name="arrow-up" size={17} color="#ff0000" />
            <Text style={{color: '#ff0000'}}>120</Text>
          </View> */}
        </View>
        <View style={styles.dataValue}>
          <Text style={styles.dataHeading}>Recovered</Text>
          <Text style={[styles.dataNumber, {color: '#48bb78'}]}>
            {recovered}
          </Text>
          {/* <View style={styles.changes}>
            <Icon name="arrow-up" size={17} color="#48bb78" />
            <Text style={{color: '#48bb78'}}>120</Text>
          </View> */}
        </View>
        <View style={styles.dataValue}>
          <Text style={styles.dataHeading}>Deceased</Text>
          <Text style={[styles.dataNumber, {color: '#000'}]}>{deaths}</Text>
          {/* <View style={styles.changes}>
            <Icon name="arrow-up" size={17} color="#000" />
            <Text style={{color: '#000'}}>120</Text>
          </View> */}
        </View>
      </View>
    </ImageBackground>
  );
}

export default CaseComponent;

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    // height: 120,
    backgroundColor: '#fff',
    marginTop: 10,
    alignSelf: 'center',
    elevation: 5,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    width: '50%',
    backgroundColor: secondarColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'gray',
    elevation: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  heading: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  dataTable: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  dataValue: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dataHeading: {
    color: '#333333',
    fontSize: 14,
  },
  dataNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  changes: {
    flexDirection: 'row',
  },
});
