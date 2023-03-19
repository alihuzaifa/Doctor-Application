import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import COLORS from '../../../assets/common/Common';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import STYLES from '../../../assets/style';
import {useFormik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  doctorProfileInitialSchema,
  doctorProfileInitialValues,
} from '../../../assets/schema';
import axios from 'axios';

const DoctorProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const formik = useFormik({
    initialValues: doctorProfileInitialValues,
    validationSchema: doctorProfileInitialSchema,
    onSubmit: async values => {
      const obj = {
        id: 0,
        drName: values?.drName,
        expertInDisease: values?.expertInDisease,
        availableDay: values?.availableDay,
        drPhone: String(values?.drPhone),
        drEmail: String(values?.drEmail),
        drPassword: values?.drPassword,
        createDate: new Date().toDateString(),
        active: true,
        drAddress: values?.drPassword,
      };
      setIsClicked(true);
      try {
        const postData = await axios.put(
          `http://drapp.somee.com/api/tblPatients/${values?.id}`,
          obj,
        );
        console.log('postData', postData?.data);
        setIsClicked(false);
      } catch (error) {
        alert(error);
        setIsClicked(false);
      }
    },
  });

  const handleOpen = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };
  let options = {savePhotos: true, mediaType: 'photo'};

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const picture = await launchCamera(options);
      console.log('picture', picture);
    } else {
      console.log('Error Succed');
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    console.log(result);
  };
  const getDoctorData = async () => {
    try {
      const value = await AsyncStorage.getItem('data');
      const data = JSON.parse(value);
      formik.setValues(data);
    } catch (err) {}
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 20}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={handleOpen}
          style={{
            borderWidth: 0.5,
            width: 120,
            height: 120,
            alignSelf: 'center',
            borderRadius: 60,
            marginTop: '10%',
          }}>
          <Image
            source={require('../../../assets/images/patient/1.png')}
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              borderRadius: 50,
              marginTop: '10%',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 19,
            fontWeight: '500',
            marginTop: 10,
          }}>
          Your Profile
        </Text>
        <View style={STYLES.inputContainer}>
          <Icon
            name="person-outline"
            color={COLORS.primary}
            size={20}
            style={STYLES.inputIcon}
          />
          <TextInput
            id="drName"
            name="drName"
            onChangeText={formik.handleChange('drName')}
            onBlur={formik.handleBlur('drName')}
            value={formik.values.drName}
            placeholder="Name"
            style={STYLES.input}
            placeholderTextColor={COLORS.light}
          />
        </View>
        {formik.errors.drName && formik.touched.drName ? (
          <Text style={STYLES.error}>{formik.errors.drName}</Text>
        ) : null}
        <View style={STYLES.inputContainer}>
          <Icon
            name="mail-outline"
            color={COLORS.primary}
            size={20}
            style={STYLES.inputIcon}
          />
          <TextInput
            id="drEmail"
            name="drEmail"
            onChangeText={formik.handleChange('drEmail')}
            onBlur={formik.handleBlur('drEmail')}
            value={formik.values.drEmail}
            placeholder="Email"
            style={STYLES.input}
            placeholderTextColor={COLORS.light}
          />
        </View>
        {formik.errors.drEmail && formik.touched.drEmail ? (
          <Text style={STYLES.error}>{formik.errors.drEmail}</Text>
        ) : null}
        <View style={STYLES.inputContainer}>
          <Icon
            name="local-hospital"
            color={COLORS.primary}
            size={20}
            style={STYLES.inputIcon}
          />
          <TextInput
            id="expertInDisease"
            name="expertInDisease"
            onChangeText={formik.handleChange('expertInDisease')}
            onBlur={formik.handleBlur('expertInDisease')}
            value={formik.values.expertInDisease}
            placeholder="Expertize"
            style={STYLES.input}
            placeholderTextColor={COLORS.light}
          />
        </View>
        {formik.errors.expertInDisease && formik.touched.expertInDisease ? (
          <Text style={STYLES.error}>{formik.errors.expertInDisease}</Text>
        ) : null}
        <View style={STYLES.inputContainer}>
          <Icon
            name="phone"
            color={COLORS.primary}
            size={20}
            style={STYLES.inputIcon}
          />
          <TextInput
            id="drPhone"
            name="drPhone"
            onChangeText={formik.handleChange('drPhone')}
            onBlur={formik.handleBlur('drPhone')}
            value={formik.values.drPhone}
            placeholder="Phone"
            style={STYLES.input}
            placeholderTextColor={COLORS.light}
          />
        </View>
        {formik.errors.drPhone && formik.touched.drPhone ? (
          <Text style={STYLES.error}>{formik.errors.drPhone}</Text>
        ) : null}
        <View style={STYLES.inputContainer}>
          <Icon
            name="lock-outline"
            color={COLORS.primary}
            size={20}
            style={STYLES.inputIcon}
          />
          <TextInput
            id="drPassword"
            name="drPassword"
            onChangeText={formik.handleChange('drPassword')}
            onBlur={formik.handleBlur('drPassword')}
            value={formik.values.drPassword}
            placeholder="Password"
            style={STYLES.input}
            placeholderTextColor={COLORS.light}
          />
        </View>
        {formik.errors.drPassword && formik.touched.drPassword ? (
          <Text style={STYLES.error}>{formik.errors.drPassword}</Text>
        ) : null}
        <View style={STYLES.inputContainer}>
          <Icon
            name="location-on"
            color={COLORS.primary}
            size={20}
            style={STYLES.inputIcon}
          />
          <TextInput
            id="drAddress"
            name="drAddress"
            onChangeText={formik.handleChange('drAddress')}
            onBlur={formik.handleBlur('drAddress')}
            value={formik.values.drAddress}
            placeholder="Address"
            style={STYLES.input}
            placeholderTextColor={COLORS.light}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: isClicked ? COLORS.light : COLORS.primary,
            height: 50,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}
          disabled={isClicked}
          onPress={formik.submitForm}>
          <Text
            style={{
              color: COLORS.white,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {isClicked ? <ActivityIndicator /> : 'Update Profile'}
          </Text>
        </TouchableOpacity>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={handleClose}
          onSwipeComplete={handleClose}
          swipeDirection={['down']}
          style={{justifyContent: 'flex-end', margin: 0}}>
          <View style={{backgroundColor: 'white', height: 240}}>
            <TouchableOpacity
              onPress={openGallery}
              style={{
                width: '92%',
                height: 60,
                borderRadius: 5,
                borderWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                backgroundColor: COLORS.primary,
                alignSelf: 'center',
              }}>
              <Text style={{color: COLORS.white, fontSize: 18}}>
                Upload Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openCamera}
              style={{
                width: '92%',
                height: 60,
                borderRadius: 5,
                borderWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                backgroundColor: COLORS.primary,
                alignSelf: 'center',
              }}>
              <Text style={{color: COLORS.white, fontSize: 18}}>
                Take Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '92%',
                height: 60,
                borderRadius: 5,
                borderWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                backgroundColor: COLORS.primary,
                alignSelf: 'center',
              }}>
              <Text
                style={{color: COLORS.white, fontSize: 18}}
                onPress={handleClose}>
                Upload
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorProfile;

const style = StyleSheet.create({
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
