import { Text,View } from "react-native";
import { NativeBaseProvider , Heading, Input} from "native-base";
import styles from "./Design/Estilos";
import MaskedInput from "react-text-mask";


//colocar o formulario para o cadastro de itens



//criar um input monetario para o valor dos itens
// criar 
export default function Cadastro_itens(){
    return(
       
            
        <View 
        
        style={{flex: 1, alignItems: 'left'}}>
            <NativeBaseProvider>
            <Heading margin={5}>
                <Text>Cadastrar Itens</Text>
            </Heading>
            <Input 
            backgroundColor={'blue.100'}
            placeholderTextColor={"black"}
            marginTop={5}
            marginLeft={5}
            marginRight={5}
            h={"50"}
            placeholder="Nome do item"
            
            >
                
            </Input>
           
            <Input 
            type="number" min="1" step="any"
            backgroundColor={'blue.100'}
            placeholderTextColor={"black"}
            marginTop={5}
            marginLeft={5}
            marginRight={5}
            style={styles.camp}
            h={"50"}
            placeholder="preço"
             
             >
                 
            
             </Input>

            </NativeBaseProvider>
        
        </View>





    )
}