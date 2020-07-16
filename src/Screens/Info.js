import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import HeaderComponent from '../Components/HeaderComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import NewsComponent from '../Components/NewsComponent';
const axios = require('react-native-axios');
const {width, height} = Dimensions.get('window');

const prevent =
  'To prevent infection and to slow transmission of COVID-19, do the following:\n\n- Wash your hands regularly with soap and water, or clean them with alcohol-based hand rub.\n- Maintain at least 1 metre distance between you and people coughing or sneezing.\n- Avoid touching your face.\nCover your mouth and nose when coughing or sneezing.\nStay home if you feel unwell.\n- Refrain from smoking and other activities that weaken the lungs.\n- Practice physical distancing by avoiding unnecessary travel and staying away from large groups of people.';

const symptoms =
  'COVID-19 affects different people in different ways. Most infected people will develop mild to moderate illness and recover without hospitalization.\n\nMost common symptoms:\n- fever.\n- dry cough.\n- tiredness.\n\nLess common symptoms:\n- aches and pains.\n- sore throat.\n- diarrhoea.\n- conjunctivitis.\n- headache.\n- loss of taste or smell.\n- a rash on skin, or discolouration of fingers or toes.\nSerious symptoms:\n\n- difficulty breathing or shortness of breath.\n- chest pain or pressure.\n- loss of speech or movement.\n- Seek immediate medical attention if you have serious symptoms.  Always call before visiting your doctor or health facility. \n\nPeople with mild symptoms who are otherwise healthy should manage their symptoms at home.\n\nOn average it takes 5–6 days from when someone is infected with the virus for symptoms to show, however it can take up to 14 days. ';

const SECTIONS = [
  {
    title: 'Overview',
    content:
      'Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.\n\nMost people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness. \n\nThe best way to prevent and slow down transmission is be well informed about the COVID-19 virus, the disease it causes and how it spreads. Protect yourself and others from infection by washing your hands or using an alcohol based rub frequently and not touching your face.  \n\nThe COVID-19 virus spreads primarily through droplets of saliva or discharge from the nose when an infected person coughs or sneezes, so it’s important that you also practice respiratory etiquette (for example, by coughing into a flexed elbow). \n\nAt this time, there are no specific vaccines or treatments for COVID-19. However, there are many ongoing clinical trials evaluating potential treatments. WHO will continue to provide updated information as soon as clinical findings become available.',
    img:
      'https://firebasestorage.googleapis.com/v0/b/covid19-5a2e1.appspot.com/o/Assets%2Fcovid.png?alt=media&token=6946b3c4-3e4b-4dab-815e-95a4c29d9296',
  },
  {
    title: 'Preventions',
    content: prevent,
    img:
      'https://firebasestorage.googleapis.com/v0/b/covid19-5a2e1.appspot.com/o/Assets%2Fface.png?alt=media&token=1df2ed59-5cd9-40c8-b851-dfe4e358c3b5',
  },
  {
    title: 'Symptoms',
    content: symptoms,
    img:
      'https://firebasestorage.googleapis.com/v0/b/covid19-5a2e1.appspot.com/o/Assets%2Fsymptom.png?alt=media&token=da7671d4-a1fe-4321-8364-511a07cf4be6',
  },
];
function Info(props) {
  const [activeSections, setActiveSections] = useState([]);
  const [arrow, setArrow] = useState('ios-arrow-down');
  const [done, setDone] = useState(false);
  const [news, setNews] = useState();

  useEffect(() => {
    setDone(false);
    axios({
      method: 'GET',
      url:
        'https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=9a91c8f9ad2c49709381940bcd749102',
    })
      .then(response => {
        var items = [];
        var item = {};
        console.log(response.data.articles[0]);
        for (var i = 1; i < response.data.articles.length; i++) {
          var data = response.data.articles[i];
          item['author'] = data.author;
          item['title'] = data.title;
          item['content'] = data.content;
          item['url'] = data.url;
          item['imgUrl'] = data.urlToImage;
          item['dateTime'] = data.publishedAt;
          item['description'] = data.description;
          items.push(item);
          item = {};
        }
        console.log(items.length);
        setNews(items);
        setDone(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const renderHeader = section => {
    return (
      <View style={styles.headerContainer}>
        <>
          <View style={styles.inner}>
            <Image source={{uri: section.img}} style={styles.img} />
            <Text style={styles.heading}>{section.title}</Text>
          </View>
          <Icon name={arrow} size={30} color="#000" />
        </>
      </View>
    );
  };

  const renderContent = section => {
    return (
      <View style={styles.content}>
        <Text style={styles.sectionText}>{section.content}</Text>
      </View>
    );
  };

  const updateSections = activeSection => {
    if (arrow == 'ios-arrow-up') {
      setArrow('ios-arrow-down');
    } else {
      setArrow('ios-arrow-up');
    }
    setActiveSections(activeSection);
  };

  return (
    <View style={styles.container}>
      <HeaderComponent header={'Information'} />
      <ScrollView>
        <Accordion
          sections={SECTIONS}
          activeSections={activeSections}
          // renderSectionTitle={renderSectionTitle}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
        />
        <Text style={styles.newsHeading}>Articles</Text>
        {done && <NewsComponent navigation={props.navigation} data={news} />}
      </ScrollView>
    </View>
  );
}

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  headerContainer: {
    width: width - 20,
    height: 60,
    // borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  img: {
    height: 40,
    width: 40,
    marginRight: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    width: width - 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 10,
    elevation: 5,
    marginBottom: 10,
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
  },
  sectionText: {
    fontSize: 15,
    color: '#000',
  },
  newsHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
    marginTop: 10,
  },
});
