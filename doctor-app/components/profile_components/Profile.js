import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  FlatList,
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
  AppState,
} from 'react-native';
import Constants from 'expo-constants';
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Ionicons } from '@expo/vector-icons';
import InviteFriend from './InviteFriend';
import PreviousAppointments from './PreviousAppointments';
import Help from './Help';
import { menuData } from '../../utils/data/MenuData';
import {
  userSelector,
  profileSelector,
  updateUserProfile,
} from './../../store';
import {
  AlertNotification,
  ALERT_DIALOG,
  ALERT_WARNING,
  ALERT_DANGER,
  ALERT_TOAST,
  ALERT_SUCCESS,
} from './../AlertNotification';

function handlePermissionDenied() {
  Alert.alert(
    'Permission Denied',
    'Push notifications are disabled. Please enable them in the app settings to receive notifications.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Open Settings',
        onPress: () => openAppSettings(),
      },
    ],
    { cancelable: true },
  );
}

function handlePermissionEnabled() {
  Alert.alert(
    'Permission Enabled',
    'Push notifications are enabled. Please disable them in the app settings to receive notifications.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Open Settings',
        onPress: () => openAppSettings(),
      },
    ],
    { cancelable: true },
  );
}

function openAppSettings() {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
}

const Menu = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const profile = useSelector(profileSelector);

  const [isNotificationEnabled, setIsNotificationEnabled] = useState(
    profile?.notification_enabled ?? false,
  );
  const [selectedSheet, setSelectedSheet] = useState(null);

  useEffect(() => {
    setIsNotificationEnabled(profile?.notification_enabled);
  }, [profile]);

  const handleNotification = async (notificationEnabled, permissionStatus) => {
    try {
      let messageToken = '';
      if (
        notificationEnabled &&
        permissionStatus === messaging.AuthorizationStatus.AUTHORIZED
      ) {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        messageToken = await messaging().getToken();
      }

      setIsNotificationEnabled(notificationEnabled);
      const formData = new FormData();
      formData.append('notification_tokens', messageToken);
      formData.append('notification_enabled', notificationEnabled);
      const response = unwrapResult(
        await dispatch(updateUserProfile(formData)),
      );
      if (response?.statusCode == 200) {
        AlertNotification({
          title: 'Save Success!',
          textBody: response?.message,
          variant: ALERT_TOAST,
          type: ALERT_SUCCESS,
        });
      }
    } catch (error) {
      console.error('profile update error', error);
      if (error?.statusCode) {
        AlertNotification({
          title: 'Something was wrong. Try again.',
          textBody: error?.message,
          variant: ALERT_TOAST,
          type: ALERT_DANGER,
        });
      }
    }
  };

  const toggleSwitch = async () => {
    try {
      const permissionStatus =
        Platform.OS === 'ios'
          ? await messaging().hasPermission()
          : (await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
              ))
            ? 1
            : 0;
      const notificationEnabled = !isNotificationEnabled;
      if (
        notificationEnabled &&
        [
          messaging.AuthorizationStatus.DENIED,
          messaging.AuthorizationStatus.NOT_DETERMINED,
        ].includes(permissionStatus)
      ) {
        handlePermissionDenied(); // make enable
        return;
      }
      if (
        !notificationEnabled &&
        [
          messaging.AuthorizationStatus.AUTHORIZED,
          messaging.AuthorizationStatus.NOT_DETERMINED,
        ].includes(permissionStatus)
      ) {
        handlePermissionEnabled(); // make disable
        return;
      }
      await handleNotification(notificationEnabled, permissionStatus);
    } catch (error) {
      console.error('profile update error', error);
    }
  };

  const handleMenuPress = (label) => {
    if (label === 'Invite a friend') {
      setSelectedSheet('InviteFriend');
    } else if (label === 'Previous Appointments') {
      setSelectedSheet('PreviousAppointments');
    } else if (label === 'Help') {
      setSelectedSheet('Help');
    } else if (label === 'My Profile') {
      navigation.navigate('MyProfile');
    }
  };

  const renderItem = ({ item }) => (
    <MenuItem
      icon={item.icon}
      label={item.label}
      type={item.type}
      switchValue={isNotificationEnabled}
      onSwitchChange={toggleSwitch}
      onPress={() => handleMenuPress(item.label)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        {profile?.photoUrl || user?.photoURL ? (
          <Image
            style={styles.profileImage}
            src={profile?.photoUrl || user?.photoURL}
          />
        ) : (
          <Ionicons
            style={[styles.profileImage, { borderWidth: 0, marginBottom: 0 }]}
            name="person-circle-outline"
            size={100}
          />
        )}
        <Text style={styles.profileName}>
          {profile?.display_name || user?.displayName}
        </Text>
        <Text style={styles.profileEmail}>{profile?.email || user?.email}</Text>
      </View>

      <FlatList
        data={menuData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.menuContainer}
      />

      {selectedSheet === 'InviteFriend' && (
        <InviteFriend onClose={() => setSelectedSheet(null)} />
      )}
      {selectedSheet === 'PreviousAppointments' && (
        <PreviousAppointments onClose={() => setSelectedSheet(null)} />
      )}
      {selectedSheet === 'Help' && (
        <Help onClose={() => setSelectedSheet(null)} />
      )}
    </View>
  );
};

const MenuItem = ({
  icon,
  label,
  type,
  switchValue,
  onSwitchChange,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    disabled={type === 'switch'}
  >
    <Image source={icon} style={styles.icon} />
    <Text style={styles.menuLabel}>{label}</Text>
    {type === 'switch' ? (
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={switchValue ? '#009EFF' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onSwitchChange}
        value={switchValue}
      />
    ) : (
      <Ionicons name="chevron-forward-outline" size={20} />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 100,
    paddingHorizontal: 20,
    backgroundColor: '#009EFF',
    borderBottomEndRadius: 40,
    borderBottomLeftRadius: 40,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '35%',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    marginTop: -55,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 20,
  },
  menuLabel: {
    fontSize: 18,
    flex: 1,
  },
  arrow: {
    fontSize: 18,
    color: '#007BFF',
  },
});

export default Menu;
