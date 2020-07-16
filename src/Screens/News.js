import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

class News extends Component {
  constructor(props) {
    super(props);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  handlePress = async url => {
    Linking.openURL(url);
  };

  formatDate = date => {
    var monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minuts = date.getMinutes();
    var seconds = date.getSeconds();
    return (
      day +
      ' ' +
      monthNames[monthIndex] +
      ' ' +
      year +
      '  ' +
      hours +
      ':' +
      minuts +
      ':' +
      seconds
    );
  };

  render() {
    const item = this.props.route.params.item;
    return (
      <View style={styles.container}>
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <TouchableOpacity onPress={() => this.goBack()}>
              <Icon name="ios-arrow-back" size={30} color="#000" />
            </TouchableOpacity>
            <View style={styles.headerData}>
              <Text style={styles.name}>{item.author}</Text>
              {/* <Text style={styles.dateTime}>
                      Friday, 3 April 02:59 PM
                    </Text> */}
            </View>
            {/* <TouchableOpacity style={styles.moreIcon}>
                    <Icon name="md-more" size={22} color="#000" />
                  </TouchableOpacity> */}
          </View>
          <Text style={[styles.name, {fontSize: 18}]}>{item.title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.descriptionText,
                {marginLeft: 10, marginBottom: 10, fontWeight: 'bold'},
              ]}>
              Published At :
            </Text>
            <Text
              style={[
                styles.descriptionText,
                {marginLeft: 10, marginBottom: 10},
              ]}>
              {this.formatDate(new Date(item.dateTime))}
            </Text>
          </View>

          <View style={styles.postData}>
            <View>
              <Image source={{uri: item.imgUrl}} style={styles.postImage} />
              <View style={styles.postDescription}>
                <Text style={styles.descriptionText}>{item.description}</Text>
                <Text style={styles.descriptionText}>{item.content}</Text>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => this.handlePress(item.url)}>
                  <Text
                    style={{color: '#000', fontSize: 17, fontWeight: 'bold'}}>
                    Read full article
                  </Text>
                  <Text
                    style={{color: 'blue', fontSize: 17, fontWeight: 'bold'}}>
                    {' '}
                    here.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default News;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#fff',
  },
  postContainer: {
    width: width,
    alignSelf: 'center',
    // marginTop: 10,
    backgroundColor: '#fff',
    // elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    paddingLeft: 15,
    elevation: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  image: {
    height: 42,
    width: 42,
    borderRadius: 22.5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#48bb78',
  },
  headerData: {
    flexDirection: 'column',
    width: width - 85,
    marginLeft: 10,
    // backgroundColor: '#e5e5e5',
  },
  name: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dateTime: {
    fontSize: 12,
    color: 'gray',
  },
  postData: {
    width: width,
  },
  postImage: {
    width: width - 20,
    height: 250,
    alignSelf: 'center',
  },
  postDescription: {
    padding: 10,
    paddingTop: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Roboto',
  },
  footer: {
    width: width,
    height: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 0.6,
    borderTopColor: '#E5E5E5',
  },
  btn: {
    width: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  moreIcon: {
    marginTop: 5,
    alignItems: 'center',
    alignContent: 'center',
  },
});
