```
pod 'GoogleUtilities', :modular_headers => true
```

```
pod 'RNDeviceInfo', :path => '../node_modules/react-native-device-info'
```

### To generate all the Android and IOS files
```
npx expo prebuild
```

### Make sure to connect your device or to run your Emulator
```
npx react-native run-android --mode="release"
```

### If you want to sign the APK and publish to Google Play Store.
```
npx react-native build-android --mode=release
```

```
cd android && ./gradlew assembleRelease
```

```
cd android && ./gradlew signingReport
```

### App version Code

```
"appVersionSource": "local"
"appVersionSource": "remote"
"appVersionSource": "inferred"
```