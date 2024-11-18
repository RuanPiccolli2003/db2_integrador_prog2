import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 
import { meuIPv4 } from './index';

const AbrirComanda = () => {
  const [idUsuario, setIdUsuario] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation(); 

  const abrirComanda = async () => {
    if (!idUsuario) {
      setError('Por favor, informe o ID do usuário.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`http://${meuIPv4}:3000/comanda`, {
        id_usuario: idUsuario,
      });
      alert('Comanda aberta com sucesso!');
      setIdUsuario("");
      navigation.navigate('Gerenciar Comandas Abertas');
 
    } catch (err) {
      setError('Erro ao abrir a comanda. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.NavigationContainer}>
      <Text style={styles.title}>Abrir Comanda</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="ID do Usuário"
        keyboardType="numeric"
        value={idUsuario}
        onChangeText={setIdUsuario}
      />

      <Button
        title={loading ? 'Abrindo Comanda...' : 'Abrir Comanda'}
        onPress={abrirComanda}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default AbrirComanda;