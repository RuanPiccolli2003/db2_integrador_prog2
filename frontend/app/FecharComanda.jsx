import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 
import { meuIPv4 } from './index';

const FecharComanda = () => {
  const [id_usuario, setId_usuario] = useState('');
  const [id_comanda, setId_comanda] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation(); 

  const FecharComanda = async () => {
    if (!id_usuario) {
      setError('Por favor, informe o ID do usuário.');
      return;
    }

    if (!id_comanda) {
        setError('Por favor, informe o ID da comanda');
        return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.put(`http://${meuIPv4}:3000/comanda/fecharcomanda/${id_comanda}`, {
        id_usuario: id_usuario,
        id_comanda: id_comanda,
      });

      navigation.navigate('ComandasList');

      alert('Comanda fechada com sucesso!');
    } catch (err) {
      setError('Erro ao fechar a comanda. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.NavigationContainer}>
      <Text style={styles.title}>Fechar Comanda</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="ID do Usuário"
        keyboardType="numeric"
        value={id_usuario}
        onChangeText={setId_usuario}
      />

    <TextInput
        style={styles.input}
        placeholder="ID da comanda"
        keyboardType="numeric"
        value={id_comanda}
        onChangeText={setId_comanda}
      />

      <Button
        title={loading ? 'Fechando Comanda...' : 'Fechar Comanda'}
        onPress={FecharComanda}
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

export default FecharComanda;
