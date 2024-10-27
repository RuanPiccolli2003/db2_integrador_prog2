import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { Button } from 'react-native-web';
import styles from './Estilos';


function Home() {
  return (
    <View style={styles.container}>
      <Text>Menu Principal</Text>
    
      <StatusBar style="auto" />
    </View>
  );
}



function App(){
    return(
      <NavigationContainer style={styles.head}>
        <Stack.Navigator>
          <Stack.Screen name="  " component={Home}/>
         
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  


export default Home