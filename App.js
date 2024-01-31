import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Loader from "./components/loader";

export default function App() {
  return (
    <View>
      <Loader/>
      <StatusBar hidden={false} />
    </View>
  );
}

const styles = StyleSheet.create({
});
