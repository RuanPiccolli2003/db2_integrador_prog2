import { Text,View} from "react-native-web";
import {Box, Heading, NativeBaseProvider, VStack, Input, Button} from "native-base"



//colocar o formulario para o cadastro de usuarios
export default function Cadastro_Usuarios(){
    return(
        <View style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
            
          <NativeBaseProvider>
            <Heading margin={10}>
                Cadastro
            </Heading>
            <Box alignItems="center">
      <Input focusOutlineColor={true} mx="3" placeholder="nome completo do usuario" w="250%" h="50"
      borderColor={'grey'}
      />
       

      <Input  secureTextEntry={true} 
       mx="3" placeholder="criar senha" 
       w="250%" h="50"
        marginTop={5}
        borderColor={'grey'}/>

      <Input secureTextEntry={'grey.100'}  
      mx="3" placeholder="repita a senha" w="250%" h="50" 
      marginTop={5}
      borderColor={'grey'}/>
      
      <Button m={5}>
        Cadastrar
      </Button>
    </Box>
    </NativeBaseProvider>

            
        </View>




    )

    
}



