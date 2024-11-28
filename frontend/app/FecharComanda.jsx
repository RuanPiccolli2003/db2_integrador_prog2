import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { meuIPv4 } from './index';
import { dominioAzure} from './index';

const FecharComanda = () => {
  const [id_usuario, setId_usuario] = useState('');
  const [id_comanda, setId_comanda] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const route = useRoute();
  const { id_comanda: comandaId } = route.params || {};

  useEffect(() => {
    if (comandaId) {
      setId_comanda(comandaId);
    }
  }, [comandaId]);

  useEffect(() => {
    const limparCampos = navigation.addListener('blur', () => {
      setId_usuario("");
      setId_comanda("");
    });

    return limparCampos;
  }, [navigation]);



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
      const response = await axios.put(`${dominioAzure}/comanda/fecharcomanda/${id_comanda}`, {
        id_usuario: id_usuario,
        id_comanda: id_comanda,
      });

      alert('Comanda fechada com sucesso!');
      setId_usuario("");
      navigation.navigate('Gerenciar Comandas Abertas');
    } catch (err) {
      setError('Erro ao fechar a comanda. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fechar Comanda: {id_comanda}</Text>

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
        placeholder={`Comanda: ${id_comanda}`}
        keyboardType="numeric"
        value={id_comanda}
        readOnly
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
    padding: 16,
    backgroundColor: 'white' 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    margin: 20,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default FecharComanda;
