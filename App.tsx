import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { loadAsync } from 'expo-font';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import 'react-native-gesture-handler';
import Main from './src/screens/Main';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await preventAutoHideAsync();
        await loadAsync({
          Montserrat_300Light,
          Montserrat_400Regular,
          Montserrat_700Bold,
        });
      } catch {
        // handle error
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <Main />
    </View>
  );
}
