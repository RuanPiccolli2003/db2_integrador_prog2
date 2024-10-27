import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { Button } from 'react-native-web';
import styles from './Estilos';
import Stack from "../Export/stack";
import Drawer from '../Export/drawer';


//pagina do menu principal




function Home() {
  return (
    <View style={styles.NavigationContainer}>
      <View>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}



export function App_Menu_Principal(){
    return(
      <NavigationContainer style={styles.head}>
        <Drawer.Navigator initialRouteName='Home'>

        <Drawer.Screen name='Menu Principal' component={Home}/>
        </Drawer.Navigator>
        
      </NavigationContainer>
    )
  }
  


export default App_Menu_Principal