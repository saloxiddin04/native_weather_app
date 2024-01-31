import { StatusBar } from 'expo-status-bar';
import {Alert, StyleSheet} from 'react-native';
import Loader from "./components/loader";
import Weather from "./components/weather";
import {useEffect, useState} from "react";
import * as Location from 'expo-location'

export default function App() {
  
  const [loader, setLoader] = useState(true)
  
  const getLocation = async () => {
    try {
      const {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied!');
        return;
      }
      
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({})
    } catch (e) {
      Alert.alert("I can't find your current location, so bad ):")
    }
  }
  
  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
      getLocation().then(r => r)
    }, 2000)
  }, []);
  
  return (
    loader ? <Loader/> : <>
      <Weather/>
      <StatusBar/>
    </>
  )
}

const styles = StyleSheet.create({
});
