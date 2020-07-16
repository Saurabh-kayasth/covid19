/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight,
  Dimensions,
  ScrollView,
} from 'react-native';
import HeaderComponent from '../Components/HeaderComponent';
import CasesTimeSeriesComponent from '../Components/CasesTimeSeriesComponent';
import CaseComponent from '../Components/CaseComponent';
import {secondarColor} from '../Constants/Theme';
import StatesComponent from '../Components/StatesComponent';
const axios = require('react-native-axios');

const {width} = Dimensions.get('window');

function Home() {
  const [con, setCon] = useState(true);
  const [rec, setRec] = useState(false);
  const [dec, setDec] = useState(false);
  const [conData, setConData] = useState(true);
  const [recData, setRecData] = useState(false);
  const [decData, setDecData] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [countries, setCountries] = useState();
  const [done, setDone] = useState(false);
  const [stateDone, setStateDone] = useState(false);
  const [states, setStates] = useState();

  useEffect(() => {
    setDataFetched(false);
    setStateDone(false);
    axios({
      method: 'GET',
      url: 'https://api.covid19india.org/data.json',
    })
      .then(response => {
        var recItems = [];
        var conItems = [];
        var decItems = [];
        setStartDate(response.data.cases_time_series[0].date);
        setEndDate(
          response.data.cases_time_series[
            response.data.cases_time_series.length - 1
          ].date,
        );
        for (var i = 0; i < response.data.cases_time_series.length; i++) {
          var resData = response.data.cases_time_series[i];
          recItems.push(parseInt(resData.totalrecovered, 10));
          decItems.push(parseInt(resData.totaldeceased, 10));
          conItems.push(parseInt(resData.totalconfirmed, 10));
        }
        console.log(conItems);
        setConData(conItems, () => {});
        setDecData(decItems, () => {});
        setRecData(recItems, () => {});
        setDataFetched(true);
      })
      .catch(error => {
        console.log(error);
      });
    getCountries();
    getStates();
  }, []);

  const getCountries = () => {
    setDone(false);
    axios({
      method: 'GET',
      url: 'https://covid19.mathdro.id/api/countries',
    })
      .then(response => {
        var items = [];
        for (var i = 0; i < response.data.countries.length; i++) {
          items.push(response.data.countries[i].name);
        }
        setCountries(items);
        setDone(true);
        // console.log(this.state.countries);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getStates = () => {
    setStateDone(false);
    axios({
      method: 'GET',
      url: 'https://api.covid19india.org/data.json',
    })
      .then(response => {
        var items = [];
        var item = {};
        for (var i = 1; i < response.data.statewise.length; i++) {
          item['state'] = response.data.statewise[i].state;
          item['confirmed'] = response.data.statewise[i].confirmed;
          item['recovered'] = response.data.statewise[i].recovered;
          item['deaths'] = response.data.statewise[i].deaths;
          items.push(item);
          item = {};
        }
        setStates(items);
        setStateDone(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const changeToRec = () => {
    setRec(true);
    setCon(false);
    setDec(false);
  };

  const changeToDec = () => {
    setRec(false);
    setCon(false);
    setDec(true);
  };
  const changeToCon = () => {
    setRec(false);
    setCon(true);
    setDec(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HeaderComponent header={'Statistics'} />
      <ScrollView>
        {done && <CaseComponent countries={countries} />}

        <Text style={styles.cases}>Cases Time Series</Text>
        <Text style={styles.country}>India</Text>

        <View style={styles.buttons}>
          <TouchableHighlight
            onPress={changeToCon}
            style={[styles.btn, {borderBottomWidth: con ? 4 : 0}]}>
            <Text style={styles.btnText}>Confirmed</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={changeToRec}
            style={[styles.btn, {borderBottomWidth: rec ? 4 : 0}]}>
            <Text style={styles.btnText}>Recovered</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={changeToDec}
            style={[styles.btn, {borderBottomWidth: dec ? 4 : 0}]}>
            <Text style={styles.btnText}>Deceased</Text>
          </TouchableHighlight>
        </View>
        {dataFetched
          ? con && (
              <CasesTimeSeriesComponent
                data={conData}
                startDate={startDate}
                endDate={endDate}
              />
            )
          : null}
        {dataFetched
          ? rec && (
              <CasesTimeSeriesComponent
                data={recData}
                startDate={startDate}
                endDate={endDate}
              />
            )
          : null}
        {dataFetched
          ? dec && (
              <CasesTimeSeriesComponent
                data={decData}
                startDate={startDate}
                endDate={endDate}
              />
            )
          : null}
        <Text style={styles.cases}>State Wise</Text>
        {stateDone && <StatesComponent data={states} />}
      </ScrollView>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  cases: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
    marginTop: 10,
  },
  country: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  buttons: {
    width: width,
    padding: 10,
    flexDirection: 'row',
    paddingBottom: 0,
  },
  btn: {
    width: '33.33%',
    height: 40,
    backgroundColor: secondarColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#fff',
    elevation: 7,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
