
import { View, Text} from "react-native";
import { StyleSheet,TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./MenuPrincipal";
import { Link,router } from "expo-router";
import styles from "./Design/Estilos";
import Stack from "./Export/stack";
import {Box, Heading, NativeBaseProvider, VStack, Input, Button} from 'native-base';


//pagina de login
//precisa validar a senha e deixar como tipo "password"






function Login(){
  function navegar(){
    router.replace("/MenuPrincipal")

  }



  return(

  
<View style={styles.NavigationContainer}>

            
            <NativeBaseProvider>
              <Heading margin={10}
              alignContent={'center'}>
                  Entrar
                  
              </Heading>
              <Box alignItems="center">
          
        <Input 
       
        placeholderTextColor={"black"}
        backgroundColor={'blue.100'}  
        focusOutlineColor={true} mx="3" 
        placeholder="Digite o usuario" w="250%" h="50"
        
        />
         
  
        <Input 
        
        placeholderTextColor={"black"}
        backgroundColor={'blue.100'} 
        secureTextEntry={true}  
        mx="3" placeholder="Digite a senha"
         w="250%" h="50" 
        marginTop={5}
        />
        
        
        <Button 
        
        bg={"red.500"}
        width={100}
        onPress={navegar}
        m={5}
        title="Submeter">
          submeter
        </Button>
       

      Não possui uma conta <Link href={'/CadastroUsuarios'} >Cadastre-se</Link>
      
      </Box>
     
      </NativeBaseProvider>
      
  

  
              
          
   
</View>

  ) 
}



function App_Login(){
  return(
    
      <Stack.Navigator>
        
        <Stack.Screen name="Login" component={Login}/>
        
       
      </Stack.Navigator>
    
  )
}







export default App_Login
