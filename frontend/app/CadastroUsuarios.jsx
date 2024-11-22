import { Text, View } from "react-native";
import { Box, Heading, NativeBaseProvider, VStack, Input, Button } from "native-base";
import { useState } from "react";
import axios from "axios";
import styles from "./Design/Estilos"; 
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./Export/stack";
import { useNavigation } from '@react-navigation/native';
import { meuIPv4 } from "./index";
import { dominioAzure} from './index';

function Cadastro_Usuarios() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const cadastrarUsuario = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${dominioAzure}/usuario`, {
        nome: nome,
        senha: senha,
        email: email,
      });

      alert("Usuário cadastrado com sucesso!");
      console.log(response.data);
      setNome("");
      setSenha("");
      setConfirmarSenha("");
      setEmail("");
      navigation.navigate('Cadastro_Usuarios');
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.NavigationContainer}>
      <NativeBaseProvider style={styles.base}>
        <Heading margin={10}>Cadastrar Usuario</Heading>

        <Input
          style={styles.inp}
          backgroundColor={'blue.100'}
          placeholderTextColor={"black"}
          justifyContent={"center"}
          h="50"
          marginTop={5}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}  
          overflow='hidden'
        />

        <Input
          secureTextEntry={true}
          style={styles.inp}
          placeholderTextColor={"black"}
          backgroundColor={'blue.100'}
          justifyContent={"center"}
          h="50"
          marginTop={5}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          overflow='hidden'
        />

        <Input
          secureTextEntry={true}
          placeholderTextColor={"black"}
          backgroundColor={'blue.100'}
          h="50"
          marginTop={5}
          placeholder="Digite a senha novamente"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <Input
          placeholderTextColor={"black"}
          backgroundColor={'blue.100'}
          h="50"
          marginTop={5}
          placeholder="Insira o seu email"
          value={email}
          onChangeText={setEmail}
        />

        <Button
          alignSelf={"center"}
          width={120}
          marginTop={5}
          backgroundColor={"red.500"}
          onPress={cadastrarUsuario}
          isLoading={loading}
          isLoadingText="Cadastrando..."
        >
          Cadastrar
        </Button>
      </NativeBaseProvider>
    </View>
  );
}

export default function App_cadUser() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cadastro" component={Cadastro_Usuarios} />
    </Stack.Navigator>
  );
}
