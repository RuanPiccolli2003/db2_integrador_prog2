import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import styles from './Design/Estilos';
import Stack from "./Export/stack";
import Drawer from './Export/drawer';
import Cadastro_itens from './CadastroItens';
import Cadastro_Usuarios from './CadastroUsuarios';
import Relatorio_Diaria from './RelatorioDiaria';
import Envio_Ordens from './EnviarOrdens';
import Abrir_Comanda from './AbrirComanda';
import Adicionar_itens_comand from './AdicionarItensComanda';
import fechamento_comanda from './FecharComanda';
import { Box, Button, NativeBaseProvider } from 'native-base';

//pagina do menu principal




function Home() {
  return (
    <View>
      <View>
          
      </View>
      <StatusBar style="auto" />
    </View>
  );
}



export function App_Menu_Principal(){
    return(
      
      <NavigationContainer style={styles.head}>
        <Drawer.Navigator 
        screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          borderRadius: 10,
        }
        }}  
        initialRouteName='Home'>
        
       
        <Drawer.Screen name='Menu Principal' component={Home}/>
       
      
        <Drawer.Screen name='Cadastro de Itens' component={Cadastro_itens}/>
        <Drawer.Screen name='Relatorios' component={Relatorio_Diaria}/>
        <Drawer.Screen name='Envio de ordens' component={Envio_Ordens}/>
        <Drawer.Screen name='Abertura de comandas' component={Abrir_Comanda}/>
        <Drawer.Screen name='adição de itens em comandas' component={Adicionar_itens_comand}/>
        <Drawer.Screen name='fechar comandas' component={fechamento_comanda}/>
        
        </Drawer.Navigator>
        
      </NavigationContainer>
     
    )
  }
  


  


export default App_Menu_Principal