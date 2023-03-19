import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import COLORS from '../assets/common/Common';

const Splash = ({navigation}) => {
  const navigateUser = () => {
    setTimeout(() => {
      navigation.navigate('OnBoard');
    }, 3000);
  };
  useEffect(() => {
    navigateUser();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.white,
      }}>
      <Image
        source={require('../assets/images/patient/2.png')}
        style={{width: 200, height: 200}}
      />
      <Text
        style={{
          fontSize: 25,
          fontWeight: '500',
          alignSelf: 'center',
          marginVertical: 10,
          color: COLORS.primary,
        }}>
        Welcome to docbook
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
