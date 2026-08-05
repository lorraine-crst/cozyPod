import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MusicScreen from './src/screens/MusicScreen';
import OptionsScreen from './src/screens/OptionsScreen';
import TracksScreen from './src/screens/TrackScreen';
import { useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    TrackPlayer.setupPlayer().catch(() => {});
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Options" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Options" component={OptionsScreen} />
        <Stack.Screen name="Now Playing" component={MusicScreen} />
        <Stack.Screen name="Songs" component={TracksScreen} />
      </Stack.Navigator>
     </NavigationContainer>
  );
}

export default App;