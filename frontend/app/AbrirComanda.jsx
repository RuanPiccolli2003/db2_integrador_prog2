import { Text,View } from "react-native";
import { useState } from "react";
import { NativeBaseProvider, Heading, Input } from "native-base";

//Criar o DatePicker
export default function Abrir_Comanda(){
    const [date, setDate] = useState(new Date())
    return(
        <View style={{flex: 1, alignItems: 'center',justifyContent: 'left', marginLeft: 5 }}>
        <NativeBaseProvider>
        <Heading>
            Comandas
          
            </Heading>
            <Heading fontSize={'sm'} marginTop={5}>
                Data Abertura
            </Heading>
            <Input>
            
            </Input>
            
        <View>
           
           
            <Heading fontSize={'sm'}>
               Data fechamento
            </Heading>
            <Input>
            </Input>


        </View>

        </NativeBaseProvider>
        </View>





    )
}
