
import { View, Text, Button} from "react-native-web";
import { StyleSheet,TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';import { Input } from 'react-native-elements';
import { Pressable } from "react-native";
import paginaPrincipal from "./Telas/MenuPrincipal";




function Pagina_Home(){
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
    onPress={() => navigation.navigate('paginaPrincipal')}
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

const minhaStack = () =>{
  return(

<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="principal"
          component={paginaPrincipal}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={paginaPrincipal} />
      </Stack.Navigator>
    </NavigationContainer>


  )


}


const styles = StyleSheet.create({
  NavigationContainer: {
    flex: 1,
    backgroundColor: '#BE5B5B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  InputArea:{
    gap: 15,
    flexDirection: 'col',
    width: '50%',
    height: 50,
    backgroundColor: 'white',
    
  },

  Input:{
    width: '95%',
    height: 50,
    backgroundColor: 'white',
    fontSize: 20,
    padding: 5,

    textAlign: 'center',

    
  },

  Input2:{
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    fontSize: 20,
    padding:10,
    

  },

  
  




});



export default App
