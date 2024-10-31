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
export default function Cadastro_Usuarios(){
  
    return(
      
      <NativeBaseProvider>
        
      <View style={styles.visua}
>
<Heading
        >
  
        Cadastrar Usuario
       </Heading>
        <form style={styles.formulario}>
        
      
       
        <textInput>
        
        </textInput>





      <Input style={styles.inp}
      
        justifyContent={"center"}
        borderColor={'grey'}
        h="50"
        padding={5}
        margin={5}
        placeholder="Nome Completo"
       
        marginTop={10}>
        </Input>
       
        <Input style={styles.inp}
      
        justifyContent={"center"}
        borderColor={'grey'}
        h="50"
        padding={5}
        margin={5}
        placeholder="Senha"
       
        marginTop={10}>
        </Input>

        <Input 
        borderColor={'grey'}
        h="50"
        padding={5}
        margin={5}
        placeholder="digite a senha novamente"
        
        marginTop={10}
        marginBottom={10}>
        </Input>


        <Input 
        borderColor={'grey'}
        h="50"
        padding={5}
        margin={5}
        placeholder="Insira o seu emaiil"
       
       >
   
        </Input>
      
        </form>
        
        <Button>
        Cadastrar
      </Button>
        
      
  
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




