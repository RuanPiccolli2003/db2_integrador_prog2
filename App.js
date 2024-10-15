import Coffee from './Components/coffee';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


const getFullName = (FirstName, secondName, ThirdName) => {
  return firstName + '' + secondName + ' ' + ThirdName
}


export default function App() {
  return (
    <Coffee>

    </Coffee>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'right',
    justifyContent: 'center',
  },
});
