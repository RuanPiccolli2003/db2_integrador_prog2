import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { meuIPv4 } from './index';
import { dominioAzure} from './index';

const FecharComanda = () => {
  const [id_usuario, setId_usuario] = useState('');
  const [id_comanda, setId_comanda] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pedidos, setPedidos] = useState([]); // dk: Estado para pedidos válidos
  const [totalComanda, setTotalComanda] = useState(0); // dk: Estado para o total da comanda
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
      setPedidos([]); // dk: Reseta pedidos ao sair da tela
      setTotalComanda(0); // dk: Reseta o total ao sair da tela
    });

    return limparCampos;
  }, [navigation]);

  // dk: Busca os pedidos válidos e o total da comanda
  useEffect(() => {
    const buscarPedidosValidos = async () => {
      if (!id_comanda) return;
      try {
        const response = await axios.get(`${dominioAzure}/comanda/validos/${id_comanda}`);
        setPedidos(response.data);
        if (response.data.length > 0) {
          setTotalComanda(response.data[0].total_comanda);
        }
      } catch (error) {
        console.error('Erro ao buscar pedidos válidos da comanda:', error);
      }
    };

    buscarPedidosValidos(); // dk: Executa a busca
  }, [id_comanda]);

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
      {/* dk: Exibição da lista de pedidos válidos */}
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id_pedido.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Item: {item.nome_item}</Text>
            <Text>Tipo: {item.tipo_item}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Subtotal: R$ {item.somaprecototal.toFixed(2)}</Text>
          </View>
        )}
      />

      {/* dk: Exibição do valor total da comanda */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Valor Total da Comanda: R$ {totalComanda.toFixed(2)}</Text>
      </View>

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
