import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
const mask =
  'https://firebasestorage.googleapis.com/v0/b/covid19-5a2e1.appspot.com/o/Assets%2Fmask.png?alt=media&token=b768dba5-67d3-4537-89c8-69e51a9ec0fd';

const {width, height} = Dimensions.get('window');

class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }

  onRefreshList = () => {
    this.setState({
      isRefreshing: false,
    });
  };

  postDetail = newsItem => {
    // alert('hello');
    this.props.navigation.navigate('news', {item: newsItem});
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          renderItem={({item, index}) => {
            return (
              <TouchableWithoutFeedback style={styles.postContainer}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    alignSelf: 'center',
                    width: width - 20,
                    elevation: 5,
                    marginTop: 10,
                  }}>
                  <View style={styles.postHeader}>
                    <Image source={{uri: item.imgUrl}} style={styles.image} />
                    <View style={styles.headerData}>
                      <Text style={styles.name} numberOfLines={2}>
                        {item.title}
                      </Text>
                      {/* <Text style={styles.dateTime}>
                      Friday, 3 April 02:59 PM
                    </Text> */}
                    </View>
                    {/* <TouchableOpacity style={styles.moreIcon}>
                    <Icon name="md-more" size={22} color="#000" />
                  </TouchableOpacity> */}
                  </View>
                  <TouchableWithoutFeedback
                    style={styles.postData}
                    onPress={() => this.postDetail(item)}>
                    <View>
                      <Image
                        source={{uri: item.imgUrl}}
                        style={styles.postImage}
                      />
                      <View style={styles.postDescription}>
                        <Text style={styles.descriptionText} numberOfLines={2}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    );
  }
}

export default NewsComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  postContainer: {
    width: width - 20,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    height: 60,
    paddingTop: 10,
    paddingLeft: 10,
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
    // backgroundColor: '#e5e5e5',
  },
  name: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
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
