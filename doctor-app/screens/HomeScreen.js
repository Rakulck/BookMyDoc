import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {
  profileSelector,
  updateUserProfile,
  appRefreshSelector,
  onAppRefresh,
} from './../store/slices';
import TopBar from '../components/home_components/TopBar/TopBar';
import AvailableDoctors from '../components/home_components/AvailableDoctors/AvailableDoctors';
import RenderFacts from '../components/home_components/Facts/RenderFacts';
import SpecialistsRender from '../components/home_components/Specialists/SpecialistsRender';
import Global_Styles from './../utils/Global_Styles';

const hasNotificationPermission = async () => {
  let enabledPermission = false;
  if (Platform.OS === 'ios') {
    const isPermission = await messaging().hasPermission();
    if (isPermission) {
      return true;
    }
    const permissionStatus = await messaging().requestPermission();

    enabledPermission =
      permissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      permissionStatus === messaging.AuthorizationStatus.PROVISIONAL;
  } else {
    const isPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (isPermission) {
      return true;
    }
    enabledPermission =
      (await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )) === 'granted';
  }
  return enabledPermission;
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);
  const appRefresh = useSelector(appRefreshSelector);

  const requestUserNotificationPermission = async () => {
    try {
      const enabledPermission = await hasNotificationPermission();
      if (enabledPermission && !profile?.notification_enabled) {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const messageToken = await messaging().getToken();
        const formData = new FormData();
        formData.append('notification_enabled', true);
        formData.append('notification_tokens', messageToken);
        dispatch(updateUserProfile(formData));
      }
    } catch (err) {
      console.warn('notification permission error', err);
    }
  };

  useEffect(() => {
    requestUserNotificationPermission();
  }, [profile]);

  return (
    <ScrollView
      contentContainerStyle={homeStyles.container}
      refreshControl={
        <RefreshControl
          refreshing={appRefresh}
          onRefresh={() => onAppRefresh(dispatch)}
          tintColor={Global_Styles.PrimaryColour}
          colors={[Global_Styles.PrimaryColour]}
        />
      }
    >
      <TopBar navigation={navigation} />
      <RenderFacts />
      <SpecialistsRender />
      <AvailableDoctors />
    </ScrollView>
  );
};

export default HomeScreen;

const homeStyles = StyleSheet.create({
  container: {
    flexGrow: 1, // Use flexGrow instead of flex to ensure the ScrollView fills the screen
    backgroundColor: '#F9F9F9',
  },
  content: {
    padding: 20,
  },
});
