import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';
import { Link, NavigationContainer } from "@react-navigation/native";
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
    <View style={styles.container}>
      <Image 
      style={styles.img}
      source={require('./imagens/food.png')}></Image>
     
      <View style={styles.footer}>
        
      </View>
    </View>
  );
}



export function App_Menu_Principal(){
    return(
      
     
        <Drawer.Navigator 
        screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          borderRadius: 10,
        }
        }}  
        initialRouteName='Home'>
        
       
        <Drawer.Screen name='Menu Principal' component={Home}/>
        <Drawer.Screen name='Abrir comandas' component={Abrir_Comanda}/>
        <Drawer.Screen name='Fechar comandas' component={fechamento_comanda}/>
        <Drawer.Screen name='Adicionar itens em comandas' component={Adicionar_itens_comand}/>
        <Drawer.Screen name='Enviar Ordens a cozinha' component={Envio_Ordens}/>
        <Drawer.Screen name='Cadastrar Itens' component={Cadastro_itens}/>
        <Drawer.Screen name='Relatorios' component={Relatorio_Diaria}/>
        
        </Drawer.Navigator>
        
     
     
    )
  }
  


  


export default App_Menu_Principal