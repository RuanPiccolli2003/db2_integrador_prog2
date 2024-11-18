import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';
import { NavigationContainer } from "@react-navigation/native"; 
import styles from './Design/Estilos';
import Drawer from './Export/drawer';
import Cadastro_item from './CadastroItens';
import Cadastro_Usuarios from './CadastroUsuarios';
import Relatorio_Diaria from './RelatorioDiaria';
import Ordens_Copa from './OrdensCopa';
import Ordens_Cozinha from './OrdensCozinha';
import AbrirComanda from './AbrirComanda';
import AdicionarItensComanda from './AdicionarItensComanda';
import FecharComanda from './FecharComanda';
import ComandaPrincipal from './Comanda';
import VisualizarComandaCompleta from './VisualizarComandaCompleta'
import { Box, Button, NativeBaseProvider } from 'native-base';


function Home() {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.img}
        source={require('./imagens/Restaurante3.jpg')}
      />
      <View style={styles.footer}></View>
    </View>
  );
}


export function App_Menu_Principal(){
  return (
    <NavigationContainer>  
      <Drawer.Navigator 
        screenOptions={{
          drawerStyle: {
            backgroundColor: 'white',
            borderRadius: 10,
          }
        }}  
        initialRouteName='Home'
      >
        <Drawer.Screen name='Menu Principal' component={Home}/>
        <Drawer.Screen name='Gerenciar Comandas Abertas' component={ComandaPrincipal}/>
        <Drawer.Screen name='Abrir comandas' component={AbrirComanda}/>
        <Drawer.Screen name='Fechar comandas' component={FecharComanda}/>
        <Drawer.Screen name='Adicionar itens em comandas' component={AdicionarItensComanda} />
        <Drawer.Screen name='Ordens Copa' component={Ordens_Copa}/>
        <Drawer.Screen name='Ordens Cozinha' component={Ordens_Cozinha}/>
        <Drawer.Screen name='Cadastrar Itens' component={Cadastro_item}/>
        <Drawer.Screen name='Relatorios' component={Relatorio_Diaria}/>
        <Drawer.Screen name='Visualizar Comanda Completa' component={VisualizarComandaCompleta}/>
      </Drawer.Navigator>
    </NavigationContainer>  
  );
}

export default App_Menu_Principal;