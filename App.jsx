
import { View, Text, Button} from "react-native-web";
import { StyleSheet,TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';import { Input } from 'react-native-elements';
import { Pressable } from "react-native";




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
    />
    </View>
   
</View>

  ) 
}

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();

function App(){
  return(
    <NavigationContainer style={styles.head}>
      <Stack.Navigator>
        <Stack.Screen name="  " component={Pagina_Home}/>
       
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

function MyDrawer() {
  return (
  
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

function barra_navegacao(){
  return(
<NavigationContainer>
<Stack.Navigator>
      <Stack.Screen name="Tela Principal" component={Pagina_Home}/>
</Stack.Navigator>
</NavigationContainer>

  )

}




export default App