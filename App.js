import {Alert, StyleSheet} from 'react-native';
import Loader from "./components/loader";
import Weather from "./components/weather";
import {useEffect, useState} from "react";
import * as Location from 'expo-location'
import axios from "axios";

const API_KEY = "1282325cbcde889d082702422efa0eda"

export default function App() {
  
  const [loader, setLoader] = useState(true)
  const [location, setLocation] = useState(null)
  
  const getWeather = async (lat, long) => {
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
    setLocation(data)
    setLoader(false)
  }
  
  const setWeather = async (query) => {
    setLoader(true)
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`)
    setLocation(data)
    setLoader(false)
  }
  
  const getLocation = async () => {
    try {
      const {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied!');
        return;
      }
      
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({})
      await getWeather(latitude, longitude)
    } catch (e) {
      Alert.alert("I can't find your current location, so bad ):")
    }
  }
  
  useEffect(() => {
    getLocation().then(r => r)
  }, []);
  
  return (
    loader ? <Loader/> : <>
      <Weather
        temp={Math.round(location?.main?.temp)}
        name={location?.name}
        condition={location?.weather[0]?.main}
        setWeather={setWeather}
      />
    </>
  )
}

const styles = StyleSheet.create({});
