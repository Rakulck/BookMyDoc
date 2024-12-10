/**
 * @format
 */
import {
  APP_ENV,
  ANDROID_WEB_CLIENT_ID,
  IOS_WEB_CLIENT_ID,
} from '@env';
const __DEV__ = APP_ENV === 'development';
import React, { StrictMode, useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import 'react-native-devsettings';
import 'react-native-devsettings/withAsyncStorage';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import Layout from './Layout';
import SplashScreen from './screens/SplashScreen';
import { persistedStore, store } from './store';
import Global_Styles from './utils/Global_Styles';

const WEB_CLIENT_ID =
  Platform.OS === 'android' ? ANDROID_WEB_CLIENT_ID : IOS_WEB_CLIENT_ID;

export default function APP() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  return (
    <>
      <StrictMode>
        <Provider store={store}>
          <PersistGate loading={<SplashScreen />} persistor={persistedStore}>
            <AlertNotificationRoot
              colors={[
                {
                  card: 'white',
                  label: 'black',
                  warning: Global_Styles.PrimaryColour,
                },
              ]}
            >
              <>
              <StatusBar
                animated={true}
                barStyle='default'
                backgroundColor={Global_Styles.PrimaryColour}
              />
               <Layout />
              </>
            </AlertNotificationRoot>
          </PersistGate>
        </Provider>
      </StrictMode>
    </>
  );
}
