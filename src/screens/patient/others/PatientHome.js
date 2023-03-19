import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from 'react-native';

import User from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../../assets/common/Common';
import hotels from '../../../assets/patientScreenData/Data';
const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;

const HomeScreen = ({navigation}) => {
  const [doctors, setDoctors] = useState([]);
  const getAllDoctors = async () => {
    const getDoctorsData = await axios.get('http://drapp.somee.com/api/tblDrs');

    const filterDoctoData = getDoctorsData?.data?.map((item, index) => {
      return {
        availableDay: item?.availableDay,
        name: item?.drName,
        drEmail: item?.drEmail,
        drPhone: item?.drPhone,
        expertInDisease: item?.expertInDisease,
        id: item?.id,
        price: 0,
        src: require('../../../assets/images/patient/1.png'),
        details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit`,
      };
    });
    setDoctors(filterDoctoData);
  };
  useEffect(() => {
    getAllDoctors();
  }, []);

  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [images, setImages] = useState([
    {id: 1, src: require('../../../assets/images/patient/1.png')},
    {id: 2, src: require('../../../assets/images/patient/1.png')},
    {id: 3, src: require('../../../assets/images/patient/1.png')},
    {id: 4, src: require('../../../assets/images/patient/1.png')},
  ]);

  const Card = ({hotel, index}) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate('DetailsScreen', hotel)}>
        <Animated.View style={{...style.card, transform: [{scale}]}}>
          <Animated.View style={{...style.cardOverLay, opacity}} />

          <Image source={hotel.src} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>
                  {hotel.name}
                </Text>
                <Text style={{color: COLORS.grey, fontSize: 12}}>
                  {hotel.location}
                </Text>
              </View>
              <Icon name="bookmark-border" size={26} color={COLORS.primary} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row'}}></View>
              <Text style={{fontSize: 10, color: COLORS.grey}}>
                {hotel.expertInDisease}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f1f1f1'}}>
      <View style={style.header}>
        <View style={{paddingBottom: 15}}>
          <Text
            style={{fontSize: 30, fontWeight: 'bold', color: COLORS.primary}}>
            Find your Doctor
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: COLORS.light}}>
              in{' '}
            </Text>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: COLORS.primary}}>
              Pakistan
            </Text>
          </View>
        </View>
        <User
          name="user"
          size={38}
          color={COLORS.primary}
          onPress={() => {
            navigation.navigate('PatientProfile');
          }}
        />
      </View>
      {/* <Slider /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.searchInputContainer}>
          <Icon name="search" size={30} style={{marginLeft: 20}} />
          <TextInput
            placeholder="Search"
            style={{fontSize: 20, paddingLeft: 10}}
          />
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.primary,
              marginLeft: 5,
            }}>
            Our Services
          </Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={images}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 5,
                marginEnd: 10,
                borderRadius: 40,
              }}>
              <Image
                source={item.src}
                style={{
                  height: 300,

                  overflow: 'hidden',
                }}
              />
            </View>
          )}
        />

        {/* <CategoryList /> */}
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.primary,
              marginLeft: 5,
            }}>
            Top Rated Doctors
          </Text>
        </View>
        <View>
          <Animated.FlatList
            onMomentumScrollEnd={e => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            horizontal
            data={doctors}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <Card hotel={item} index={index} />}
            snapToInterval={cardWidth}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: '93%',
  },
  categoryListContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    marginHorizontal: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    height: 250,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topHotelCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default HomeScreen;
