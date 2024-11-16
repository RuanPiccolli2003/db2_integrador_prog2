import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';
import { NavigationContainer } from "@react-navigation/native"; 
import styles from './Design/Estilos';
import Drawer from './Export/drawer';
import Cadastro_itens from './CadastroItens';
import Cadastro_Usuarios from './CadastroUsuarios';
import Relatorio_Diaria from './RelatorioDiaria';
import Ordens_Copa from './OrdensCopa';
import Ordens_Cozinha from './OrdensCozinha';
import Abrir_Comanda from './AbrirComanda';
import Adicionar_itens_comand from './AdicionarItensComanda';
import fechamento_comanda from './FecharComanda';
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
        <Drawer.Screen name='Abrir comandas' component={Abrir_Comanda}/>
        <Drawer.Screen name='Fechar comandas' component={fechamento_comanda}/>
        <Drawer.Screen name='Adicionar itens em comandas' component={Adicionar_itens_comand}/>
        <Drawer.Screen name='Ordens Copa' component={Ordens_Copa}/>
        <Drawer.Screen name='Ordens Cozinha' component={Ordens_Cozinha}/>
        <Drawer.Screen name='Cadastrar Itens' component={Cadastro_itens}/>
        <Drawer.Screen name='Relatorios' component={Relatorio_Diaria}/>
      </Drawer.Navigator>
    </NavigationContainer>  
  );
}

export default App_Menu_Principal;
