import React, { useState } from 'react';
import { View } from 'react-native';
import { NativeBaseProvider, Box, Heading, Input, Button, Text as NativeBaseText } from 'native-base';
import Axios from 'axios';
import { Link, router, useNavigation } from 'expo-router'; 
import styles from './Design/Estilos'; 
import Cadastro_Usuarios from './CadastroUsuarios.jsx'

export const dominioAzure = 'http://localhost:3000';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, alert] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await Axios.post(`${dominioAzure}/login`, { email, senha });

      if (response.status === 200) {
        const { token } = response.data;
        router.replace("/MenuPrincipal");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data); 
      } else {
        alert("Erro ao tentar realizar o login. Tente novamente.");
      }
    }
  };

  return (
    <View style={styles.NavigationContainer}>
      <NativeBaseProvider>
        <Heading margin={10} alignContent={'center'}>
          Entrar
        </Heading>
        <Box alignItems="center">
          {erro ? (
            <NativeBaseText color="red.500" mb={2}>
              {erro}
            </NativeBaseText>
          ) : null}
          
          <Input
            placeholderTextColor={"black"}
            backgroundColor={'blue.100'}
            focusOutlineColor={true}
            mx="3"
            placeholder="Digite o email"
            w="250%"
            h="50"
            value={email}
            onChangeText={setEmail}
          />
          
          <Input
            placeholderTextColor={"black"}
            backgroundColor={'blue.100'}
            secureTextEntry={true}
            mx="3"
            placeholder="Digite a senha"
            w="250%"
            h="50"
            marginTop={5}
            value={senha}
            onChangeText={setSenha}
          />

          <Button
            bg={"red.500"}
            width={100}
            onPress={handleLogin}
            m={5}
            title="Submeter"
          >
            Submeter
          </Button>

          Não possui uma conta <Link href={'/CadastroUsuarios'}>Cadastre-se</Link>
        </Box>
      </NativeBaseProvider>
    </View>
  );
}

export default Login;