
import { View, Text, Button} from "react-native-web";
import { StyleSheet,TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';import { Input } from 'react-native-elements';
import { Pressable } from "react-native";
import Home from "./MenuPrincipal";
import { Link,router } from "expo-router";
import styles from "./Estilos";



function Pagina_Home(){
  function navegar(){
    router.replace("/MenuPrincipal")

  }



  return(

  
<View style={styles.NavigationContainer}>
  <View style={styles.InputArea}>
   


  <TextInput
    style={styles.Input2}
    placeholder="insira o nome do usuario"
    placeholderTextColor="grey"
    />

    <TextInput
    style={styles.Input2}
    placeholder="insira a sua senha"
    placeholderTextColor="grey"
    /> 
    <Button color="crimson"
    style={styles.botao}
    title="Pressione"
    onPress={navegar}
    />
    </View>
   
</View>

  ) 
}

const Stack = createNativeStackNavigator()

function App(){
  return(
    <NavigationContainer style={styles.head}>

      <Stack.Navigator>
        
        <Stack.Screen name="  " component={Pagina_Home}/>
        
       
      </Stack.Navigator>
    </NavigationContainer>
  )
}







export default App
