import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Esquema de validação usando Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().email('Insira um email válido').required('O email é obrigatório'),
  password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
});

// Função de renderização do formulário usando Formik e React Native Paper
function Pagina_Home() {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            {/* Campo de Nome */}
            <TextInput
              label="Nome"
              mode="outlined"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              style={styles.input}
            />
            <HelperText type="error" visible={touched.name && errors.name}>
              {errors.name}
            </HelperText>

            {/* Campo de E-mail */}
            <TextInput
              label="E-mail"
              mode="outlined"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.input}
            />
            <HelperText type="error" visible={touched.email && errors.email}>
              {errors.email}
            </HelperText>

            {/* Campo de Senha */}
            <TextInput
              label="Senha"
              mode="outlined"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              style={styles.input}
            />
            <HelperText type="error" visible={touched.password && errors.password}>
              {errors.password}
            </HelperText>

            {/* Botão de Enviar */}
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              Enviar
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const Stack = createNativeStackNavigator();

// Componente principal com Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tela Principal" component={Pagina_Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
  },
});
