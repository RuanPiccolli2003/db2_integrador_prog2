import { View, Text} from "react-native-web";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function Pagina_Home(){
  return(
    <View style={styles.NavigationContainer}>
	<div>
        	<FormularioTexto label="Nome" labelClass="form-label" inputType="text" inputId="name" inputName="name" inputClass="form-control" inputRequired="true" />
        	<FormularioTexto label="E-mail" labelClass="form-label" inputType="email" inputId="email" inputName="email" inputClass="form-control" inputRequired="true" />
        	<FormularioTexto label="Senha" labelClass="form-label" inputType="password" inputId="password" inputName="password" inputClass="form-control" inputRequired="true" />
	</div>
</View>
  );
};

const Stack = createNativeStackNavigator();

function FormularioTexto({label,labelClass,inputType,inputId,inputName,inputClass,inputRequired}){
  return (
    <>
      <div class="form-group">
        <label class={labelClass} for={inputId}>{label}</label><br/>
        <input type={inputType} class={inputClass} id={inputId} name={inputName} required={inputRequired} />
      </div>
    </>
  )
}

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
