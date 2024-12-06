import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { dominioAzure } from './index';
import { useFocusEffect } from 'expo-router';

const FecharComanda = () => {
  const [id_usuario, setId_usuario] = useState('');
  const [id_comanda, setId_comanda] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const [modalBuscarDetalhesComanda, setModalBuscarDetalhesComanda] = useState(false);
  const [valorTotalComanda, setValorTotalComanda] = useState(0);
  const [total_da_comanda, setTotal_da_comanda] = useState('');
  const [pedidosComanda, setPedidosComanda] = useState([]);
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

  const BuscarDetalhesComanda = async () => {
    if (!comandaId) {
      setError('Por favor, informe o ID da comanda');
      return;
    }

    try {
      const response = await axios.get(`${dominioAzure}/comandaBuscarTotalValorComanda`, {
        params: { id_comanda: comandaId }
      });
      setValorTotalComanda(response.data);
    } catch (error) {
      console.error('Erro ao buscar valor total da comanda:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      BuscarDetalhesComanda();
    }, [comandaId]) 
  );

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

      <TextInput
        style={styles.input}
        placeholder={`Valor Total: R$ ${valorTotalComanda[0]?.total_da_comanda || '0'}`}
        keyboardType="numeric"
        value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotalComanda[0]?.total_da_comanda || 0)}
        readOnly
        onChangeText={() => { }}
      />

      <TouchableOpacity
        onPress={() => setModalBuscarDetalhesComanda(true)}
      >
        <Text style={styles.input}>Abrir Pedidos</Text>
      </TouchableOpacity>

      <Modal
        visible={modalBuscarDetalhesComanda}
        animationType="slide"
        transparente={true}
        onRequestClose={() => setModalBuscarDetalhesComanda(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>Pedidos</Text>
            <FlatList
              data={valorTotalComanda}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ padding: 5 }}>
                  <Text>Item: {item.nome_do_item}</Text>
                  <Text>Quantidade: {item.quantidade}</Text>
                  <Text>Total Pedido: {item.total_do_pedido}</Text>
                </View>
              )}
            />
            <Button title="Fechar" onPress={() => setModalBuscarDetalhesComanda(false)} />
          </View>
        </View>
      </Modal>

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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});

export default FecharComanda;
