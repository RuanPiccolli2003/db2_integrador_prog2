import { Text,View} from "react-native-web";
import {Box, Heading, NativeBaseProvider, VStack, Input, Button,login} from "native-base"
import styles from "./Design/Estilos";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./Export/stack";
import Modal from "react-native-modal";
import { StyleSheet,TextInput } from "react-native";
import { useForm } from "react-hook-form";
import { Pressable } from "react-native";

//colocar o formulario para o cadastro de usuarios
function Cadastro_Usuarios(){
  
    return(
      
    <View 
    style={styles.NavigationContainer}>
      <NativeBaseProvider style={styles.base}>
        
  
<Heading
margin={10}
        >
  
        Cadastrar Usuario
        
       </Heading>
      
        <form
        
        style={styles.formulario}>
        
      
      
      <Input 
        style={styles.inp}
        backgroundColor={'blue.100'}
        placeholderTextColor={"black"}
        justifyContent={"center"}
        h="50"
        marginTop={5}
        
        placeholder="Nome Completo">

        </Input>
       
        <Input 
        secureTextEntry={true}    
        style={styles.inp}
        placeholderTextColor={"black"}
        backgroundColor={'blue.100'}
        justifyContent={"center"}
      
        h="50"
        marginTop={5}
        placeholder="Senha">
        </Input>

        <Input       
        placeholderTextColor={"black"}
        backgroundColor={'blue.100'}      
        h="50"
        marginTop={5}
        secureTextEntry={true} 
        placeholder="Digite a senha novamente" >
                                                 
        </Input>


        <Input 

        placeholderTextColor={"black"}
        backgroundColor={'blue.100'}   
        h="50"
       
        marginTop={5}
        placeholder="Insira o seu emaiil"
       
       >
   
        </Input>
      
        <View>
        
        <Button
      
        alignSelf={"center"}
        width={100}
        marginTop={5}
        backgroundColor={"red.500"}>
        Cadastrar
      </Button>
      
      </View>
      
      </form>
  
     
      
     </NativeBaseProvider>

     </View>
        
       

    )

    
}

export default function App_cadUser(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Cadastro" component={Cadastro_Usuarios}/>
        
       
      </Stack.Navigator>
    </NavigationContainer>
  )
}




