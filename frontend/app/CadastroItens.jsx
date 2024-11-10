import { TextField,View,Text } from "react-native";
import { NativeBaseProvider , Heading, Input, Button} from "native-base";
import styles from "./Design/Estilos";
import CurrencyMaskInput from 'react-native-currency-input';
import React from "react";
import InputSpinner from "react-native-input-spinner";



//colocar o formulario para o cadastro de itens



//criar um input monetario para o valor dos itens
// criar 

export default function Cadastro_itens(){
    const [value,setValue] = React.useState(0.00)

    return(
        
            
        <View 
        

        
        
        style={{flex: 1, alignItems: 'center',}}>
            <NativeBaseProvider>

            
            <Heading margin={5}
            alignItems={'center'}
            >
                <Text>Cadastrar Itens</Text>
       <hr />
            </Heading>
            <Heading 
            fontSize={'sm'}
            margin={5}>
                <Text>Item - 1</Text>
        
                
            </Heading>
            <Input 
            backgroundColor={'blue.100'}
            placeholderTextColor={"black"}
            marginTop={5}
            marginLeft={5}
            marginRight={5}
            h={"50"}
            placeholder="Nome do item"
            margin={5}
            >
                
            </Input>
            <Heading 
            fontSize={'sm'}
            margin={5}>
                <Text>Valor / quantidade</Text>
                
            </Heading>
            <View style={styles.curr}>
               
            <CurrencyMaskInput
            style={styles.cotacao}
            value={value}
            onChangeValue={setValue}
            prefix="R$ "
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            onChangeText={(formattedValue) => {
            
          }}
        
        />
        
        
         
        <InputSpinner
        max={10}
        min={1}
        showBorder={true}
        colorMax={"crimson"}
	    colorMin={"#40c5f4"}
        rounded={false}
        style={{marginLeft: 'auto'}}>
            
        </InputSpinner>
       
       
        


        </View>

        
        
       
        

<Heading margin={5}
alignItems={'center'}
>
 
    
</Heading>
<Heading 
fontSize={'sm'}
margin={5}>
    <Text>Item - 2</Text>
    
</Heading>
<Input 
backgroundColor={'blue.100'}
placeholderTextColor={"black"}
marginTop={5}
marginLeft={5}
marginRight={5}
h={"50"}
placeholder="Nome do item"
margin={5}
>
    
</Input>
<Heading 
fontSize={'sm'}
margin={5}>
    <Text>Valor / quantidade</Text>
    
</Heading>
<View style={styles.curr}>
   
<CurrencyMaskInput
style={styles.cotacao}
value={value}
onChangeValue={setValue}
prefix="R$ "
delimiter="."
separator=","
precision={2}
minValue={0}
onChangeText={(formattedValue) => {

}}

/>



<InputSpinner
color="crimson"
max={10}
min={1}
showBorder={true}
rounded={false}
style={{marginLeft: 'auto'}}>

</InputSpinner>




</View>



<Button style={{width: '30%', alignItems: 'flex-start', 
            marginLeft:  'auto', marginRight: 'auto', 
            marginTop: 'auto', marginBottom: 'auto'}}>
               
Cadastrar itens

</Button>


</NativeBaseProvider>


         

         
          
        
        </View>
        

        
        
      

  
    )
}

