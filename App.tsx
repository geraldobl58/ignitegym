import { StatusBar } from 'react-native';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import { NativeBaseProvider } from 'native-base';

import { Loading } from '@components/Loading';

import { AuthContext } from '@contexts/AuthContext';

import { Routes } from './src/routes';

import { THEME } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContext.Provider value={{  
        id: '1',
        name: 'John Doe',
        email: 'johndoe@email.com',
        avatar: 'johndoe.png'
      }}>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}