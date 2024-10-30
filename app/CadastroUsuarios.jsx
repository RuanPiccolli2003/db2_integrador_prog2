import { Text,View} from "react-native-web";
import {Box, Heading, NativeBaseProvider, VStack, Input, Button,login} from "native-base"
import styles from "./Design/Estilos";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./Export/stack";
import Modal from "react-native-modal";
import { StyleSheet,TextInput } from "react-native";


//colocar o formulario para o cadastro de usuarios
export default function Cadastro_Usuarios(){
  
    return(
      
      <NativeBaseProvider>
        
      <View styles={styles.view}
>
      
        <Modal
        h="50"
        marginTop={10}
        style={styles.container}
        isVisible={true}
        animationType="fade">
        <Heading
        margin={5}>
  
        Cadastrar Usuario
       </Heading>
      
       
        <Input
        borderColor={'grey'}
        h="50"
        margin={5}
        placeholder="Nome Completo"
        w="50%"
        marginTop={10}>
        </Input>
       
        <Input 
        borderColor={'grey'}
        h="50"
        padding={5}
        margin={5}
        placeholder="Senha"
        w="45%"
        marginTop={10}>
        </Input>

        <Input 
        borderColor={'grey'}
        h="50"
        padding={5}
        margin={5}
        placeholder="digite a senha novamente"
        w="45%"
        marginTop={10}
        marginBottom={10}>
        </Input>


        <Input 
        borderColor={'grey'}
        h="50"
        padding={5}
        margin={5}
        placeholder="Insira o seu emaiil"
        w="45%"
       >
   
        </Input>


       
       
      </Modal>
      
  
      </View>
     </NativeBaseProvider>
        
       

    )

    
}

function App_cadUser(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Lasdasdasd" component={Cadastro_Usuarios}/>
        
       
      </Stack.Navigator>
    </NavigationContainer>
  )
}




