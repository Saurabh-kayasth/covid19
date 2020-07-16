import React, {useState} from 'react';

import {View, StyleSheet, Dimensions, Text, Switch} from 'react-native';
import {LineChart, Grid, BarChart, YAxis} from 'react-native-svg-charts';

const {width} = Dimensions.get('window');

function CasesTimeSeriesComponent(props) {
  const [value, setValue] = useState(false);
  const contentInset = {top: 20, bottom: 20};
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {value ? (
          <View style={styles.graph}>
            <YAxis
              data={props.data}
              contentInset={contentInset}
              svg={{
                fill: 'grey',
                fontSize: 10,
              }}
              numberOfTicks={10}
              formatLabel={values => `${values}`}
            />
            <BarChart
              animate={true}
              style={styles.chart}
              data={props.data}
              svg={{stroke: '#245d3c', strokeWidth: 3}}
              contentInset={contentInset}>
              {/* <YAxis data={props.data} /> */}

              <Grid />
            </BarChart>
          </View>
        ) : (
          <View style={styles.graph}>
            <YAxis
              data={props.data}
              contentInset={contentInset}
              svg={{
                fill: 'grey',
                fontSize: 10,
              }}
              numberOfTicks={10}
              formatLabel={values => `${values}`}
            />
            <LineChart
              animate={true}
              style={styles.chart}
              data={props.data}
              svg={{stroke: '#245d3c', strokeWidth: 3}}
              contentInset={contentInset}>
              {/* <YAxis data={props.data} /> */}

              <Grid />
            </LineChart>
          </View>
        )}

        <Text style={styles.date}>
          {props.startDate} - {props.endDate}
        </Text>
        <View style={styles.changeView}>
          <Text style={styles.changeText}>Cumulative</Text>
          <Switch
            value={value}
            onValueChange={() => setValue(!value)}
            style={styles.switch}
          />
        </View>
      </View>
    </View>
  );
}

export default CasesTimeSeriesComponent;

const styles = StyleSheet.create({
  main: {
    width: width - 20,
    alignSelf: 'center',
  },
  graph: {
    height: 200,
    flexDirection: 'row',
  },
  chart: {
    flex: 1,
    marginLeft: 16,
  },
  switch: {
    alignSelf: 'center',
    marginTop: 5,
  },
  container: {
    width: '100%',
    backgroundColor: '#daf1e4',
    alignSelf: 'center',
    elevation: 5,
    borderRadius: 5,
    padding: 5,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  changeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeText: {
    fontSize: 16,
    marginRight: 10,
  },
});
