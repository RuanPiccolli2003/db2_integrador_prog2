import { View, Text} from "react-native-web";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function Pagina_Home(){
  return(
    <View style={styles.NavigationContainer}>
    </View>
  );
};

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tela Principal" component={Pagina_Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  NavigationContainer: {
    flex: 1,
    backgroundColor: '#DE7CC6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App