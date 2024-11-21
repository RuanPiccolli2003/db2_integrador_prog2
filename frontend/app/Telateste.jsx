import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { meuIPv4 } from './index';
import axios from 'axios';

function Teste() {
  const navigation = useNavigation();
  const [comandasTotais, setComandasTotais] = useState({ abertas: 0, fechadas: 0 });
  const [comandas, setComandas] = useState([]);
  const [comandasBarraDePesquisa, setComandasBarraDePesquisa] = useState([]);
  const [pedidosAtrasados, setPedidosAtrasados] = useState([]);
  const [outrosDados, setOutrosDados] = useState({ totalVendas: 0, mesasDisponiveis: 0, clientesAtivos: 0 });

  const buscarTotalComandas = async () => {
    try {
      const response = await axios.get(`http://${meuIPv4}:3000/comandaBuscarAbertaFechadaHoje`);
      const data = response.data[0];
      setComandasTotais({
        abertas: parseInt(data.comandas_abertas, 10),
        fechadas: parseInt(data.comandas_fechadas, 10),
      });
    } catch (error) {
      console.error('Erro ao buscar total de comandas:', error);
    }
  };

  //DAQUI PRA BAIXO É APENAS TESTES PARA APARECER NA PAGINA INICIAL, SÓ PARA VER COMO FICAVA KKKKKKKKKKKKKKK

  async function buscarPedidosAtrasados() {
    const data = [
      { id_pedido: 1, item: 'Pizza', tempo_aberto_br: '00:45:00' },
      { id_pedido: 2, item: 'Hambúrguer', tempo_aberto_br: '00:40:00' },
    ];
    setPedidosAtrasados(data);
  }

  async function buscarOutrosDados() {
    const data = {
      totalVendas: 1500.5,
      mesasDisponiveis: 4,
      clientesAtivos: 15,
    };
    setOutrosDados(data);
  }

  useEffect(() => {
    buscarTotalComandas();
    buscarPedidosAtrasados();
    buscarOutrosDados();
    const interval = setInterval(() => {
      buscarTotalComandas();
      buscarPedidosAtrasados();
      buscarOutrosDados();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Buscar..." />
        <TouchableOpacity style={styles.comandaButton}>
          <MaterialIcons name="receipt-long" size={30} color="black"
            onPress={() => {
              navigation.navigate('Gerenciar Comandas Abertas');
            }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <MaterialIcons name="receipt-long" size={30} color="#007bff" />
            <Text style={styles.cardTitle}>Comandas</Text>
            <Text style={styles.cardText}>Abertas: {comandasTotais.abertas}</Text>
            <Text style={styles.cardText}>Fechadas Hoje: {comandasTotais.fechadas}</Text>
          </View>

          <View style={styles.card}>
            <MaterialIcons name="restaurant" size={30} color="#007bff" />
            <Text style={styles.cardTitle}>Pedidos Atrasados</Text>
            {pedidosAtrasados.length > 0 ? (
              pedidosAtrasados.map((pedido) => (
                <Text key={pedido.id_pedido} style={styles.cardText}>
                  {pedido.item} - {pedido.tempo_aberto_br}
                </Text>
              ))
            ) : (
              <Text style={styles.cardText}>Sem pedidos atrasados</Text>
            )}
          </View>

          <View style={styles.card}>
            <MaterialIcons name="attach-money" size={30} color="#007bff" />
            <Text style={styles.cardTitle}>Total de Vendas</Text>
            <Text style={styles.cardText}>R$ {outrosDados.totalVendas.toFixed(2)}</Text>
          </View>

          <View style={styles.card}>
            <MaterialIcons name="table-restaurant" size={30} color="#007bff" />
            <Text style={styles.cardTitle}>Mesas Disponíveis</Text>
            <Text style={styles.cardText}>{outrosDados.mesasDisponiveis}</Text>
          </View>

          <View style={styles.card}>
            <MaterialIcons name="group" size={30} color="#007bff" />
            <Text style={styles.cardTitle}>Clientes Ativos</Text>
            <Text style={styles.cardText}>{outrosDados.clientesAtivos}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}
          onPress={() => {
            navigation.navigate('Ordens Cozinha');
          }} >
          <Text style={styles.footerButtonText}>Cozinha </Text>
          <MaterialIcons name="restaurant" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => {
          navigation.navigate('Ordens Copa');
        }}>
          <Text style={styles.footerButtonText}>Copa { }</Text>
          <MaterialIcons name="local-bar" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  settingsIcon: {
    marginLeft: 10,
  },
  comandaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A8E6A3',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
    elevation: 3,
  },
  body: {
    flex: 1,
    padding: 10,
  },
  cardsContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardText: {
    fontSize: 14,
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    elevation: 2,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#ddd',
  },
  footerButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Teste;
